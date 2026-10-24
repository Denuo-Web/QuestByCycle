import pytest
import shutil
from flask import url_for

from app import create_app
from app.utils.file_uploads import (
    public_media_url,
    allowed_image_file,
    delete_media_file,
    save_game_logo,
)
from app.utils import get_int_param, MAX_IMAGE_DIMENSION

@pytest.fixture
def app():
    app = create_app({
        "TESTING": True,
        "WTF_CSRF_ENABLED": False,
    })
    ctx = app.app_context()
    ctx.push()
    yield app
    ctx.pop()


def test_public_media_url_variants(app):
                                           
    assert public_media_url("https://example.com/img.jpg") == "https://example.com/img.jpg"

                                                              
    assert public_media_url("/static/images/foo.jpg") == "/static/images/foo.jpg"

                                          
    expect = url_for("static", filename="images/foo.jpg")
    assert public_media_url("static/images/foo.jpg") == expect

                                    
    assert public_media_url("/images/foo.jpg") == expect

                                           
    assert public_media_url("images/foo.jpg") == expect


def test_public_media_url_invalid(app):
    """Invalid absolute media URLs return ``None``."""
    assert public_media_url("https:///nohost.jpg") is None
    assert public_media_url("https://") is None

def test_save_submission_video_invalid(app, tmp_path):
    """Uploading an invalid video should raise a ValueError."""
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_video

    fake_video = BytesIO(b"not a real video")
    file = FileStorage(stream=fake_video, filename="bad.mp4", content_type="video/mp4")

    with pytest.raises(ValueError):
        save_submission_video(file)


def test_save_submission_video_no_ffmpeg(app, monkeypatch, tmp_path):
    """Video uploads fail closed when the media parser is unavailable."""
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_video
    import shutil

    video_data = BytesIO(b"0" * 100)
    file = FileStorage(stream=video_data, filename="small.mp4", content_type="video/mp4")

    app.config["FFMPEG_PATH"] = "/nonexistent/ffmpeg"
    app.static_folder = str(tmp_path)
    monkeypatch.setattr(shutil, "which", lambda x: None)

    with pytest.raises(ValueError, match="unavailable"):
        save_submission_video(file)
    assert not (tmp_path / "videos").exists()


def test_save_submission_video_disallowed_mimetype(app):
    """Reject videos with disallowed MIME types."""
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_video

    data = BytesIO(b"0" * 100)
    file = FileStorage(stream=data, filename="clip.mp4", content_type="application/octet-stream")

    with pytest.raises(ValueError):
        save_submission_video(file)


@pytest.mark.skipif(
    any(shutil.which(tool) is None for tool in ("ffmpeg", "ffprobe", "bwrap", "prlimit")),
    reason="sandboxed FFmpeg tools not available",
)
def test_save_submission_video_dimension_limit(app, tmp_path):
    """Videos exceeding resolution limits should be rejected."""
    import subprocess
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_video

    ffmpeg = shutil.which("ffmpeg")
    big_video = tmp_path / "big.mp4"
    cmd = [
        ffmpeg,
        "-f",
        "lavfi",
        "-i",
        "color=size=2000x1200:duration=1:rate=1",
        "-c:v",
        "libx264",
        "-crf",
        "35",
        "-y",
        str(big_video),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    with big_video.open("rb") as fh:
        file = FileStorage(stream=BytesIO(fh.read()), filename="big.mp4", content_type="video/mp4")
    with pytest.raises(ValueError):
        save_submission_video(file)


@pytest.mark.skipif(
    any(shutil.which(tool) is None for tool in ("ffmpeg", "ffprobe", "bwrap", "prlimit")),
    reason="sandboxed FFmpeg tools not available",
)
@pytest.mark.parametrize(
    ("extension", "mimetype", "codec"),
    [("mp4", "video/mp4", "libx264"), ("mov", "video/quicktime", "libx264"),
     ("webm", "video/webm", "libvpx-vp9")],
)
def test_save_submission_video_sandboxed_roundtrip(app, tmp_path, extension, mimetype, codec):
    """Supported short videos still convert to MP4 inside the media sandbox."""
    import subprocess
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_video

    app.static_folder = str(tmp_path / "static")
    app.config["GCS_BUCKET"] = None
    input_path = tmp_path / f"input.{extension}"
    subprocess.run(
        [shutil.which("ffmpeg"), "-loglevel", "error", "-f", "lavfi", "-i",
         "color=size=320x240:duration=1:rate=5", "-c:v", codec, "-y", str(input_path)],
        check=True,
    )
    video = FileStorage(stream=BytesIO(input_path.read_bytes()), filename=input_path.name, content_type=mimetype)

    saved = save_submission_video(video)

    assert saved.startswith("videos/verifications/")
    assert saved.endswith(".mp4")
    assert (tmp_path / "static" / saved).stat().st_size > 0
    assert not list((tmp_path / "static" / "videos" / "tmp").iterdir())


@pytest.mark.skipif(
    any(shutil.which(tool) is None for tool in ("ffmpeg", "ffprobe", "bwrap", "prlimit")),
    reason="sandboxed FFmpeg tools not available",
)
def test_save_submission_video_streamed_webm(app, tmp_path):
    """WebM streams without container duration still convert within the ten-second cap."""
    import subprocess
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_video

    app.static_folder = str(tmp_path / "static")
    app.config["GCS_BUCKET"] = None
    source = subprocess.run(
        [shutil.which("ffmpeg"), "-loglevel", "error", "-f", "lavfi", "-i",
         "color=size=320x240:duration=1:rate=5", "-c:v", "libvpx-vp9", "-f", "webm", "pipe:1"],
        check=True, stdout=subprocess.PIPE,
    ).stdout
    upload = FileStorage(stream=BytesIO(source), filename="stream.webm", content_type="video/webm")

    saved = save_submission_video(upload)

    assert (tmp_path / "static" / saved).stat().st_size > 0


@pytest.mark.skipif(
    any(shutil.which(tool) is None for tool in ("ffmpeg", "ffprobe", "bwrap", "prlimit")),
    reason="sandboxed FFmpeg tools not available",
)
def test_save_submission_video_uses_probed_stream(app, tmp_path):
    """A default video stream cannot bypass the dimensions checked on the first stream."""
    import subprocess
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_video

    app.static_folder = str(tmp_path / "static")
    app.config["GCS_BUCKET"] = None
    source_path = tmp_path / "two-streams.mp4"
    subprocess.run(
        [shutil.which("ffmpeg"), "-loglevel", "error", "-f", "lavfi", "-i",
         "color=size=320x240:duration=1:rate=5", "-f", "lavfi", "-i",
         "color=size=2048x1152:duration=1:rate=5", "-map", "0:v", "-map", "1:v",
         "-disposition:v:0", "0", "-disposition:v:1", "default", "-c:v", "libx264",
         "-threads", "1", "-y", str(source_path)],
        check=True,
    )
    upload = FileStorage(stream=BytesIO(source_path.read_bytes()), filename="two-streams.mp4", content_type="video/mp4")

    saved = save_submission_video(upload)
    dimensions = subprocess.run(
        [shutil.which("ffprobe"), "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=width,height", "-of", "csv=p=0", str(tmp_path / "static" / saved)],
        check=True, stdout=subprocess.PIPE,
    ).stdout.strip()

    assert dimensions == b"320,240"


@pytest.mark.skipif(
    any(shutil.which(tool) is None for tool in ("bwrap", "prlimit")),
    reason="media sandbox tools not available",
)
def test_video_tool_cannot_read_outside_workdir_or_run_unbounded(app, tmp_path):
    """A compromised parser cannot read app files outside its job directory."""
    from app.utils.file_uploads import _run_video_tool

    workdir = tmp_path / "work"
    workdir.mkdir()
    (workdir / "input.txt").write_text("allowed")
    secret = tmp_path / "secret.txt"
    secret.write_text("hidden")

    assert _run_video_tool("/usr/bin/cat", ["/work/input.txt"], str(workdir), timeout=5) == b"allowed"
    with pytest.raises(ValueError, match="Invalid or corrupted"):
        _run_video_tool("/usr/bin/cat", [str(secret)], str(workdir), timeout=5)
    with pytest.raises(ValueError, match="timed out"):
        _run_video_tool("/usr/bin/sleep", ["5"], str(workdir), timeout=1)


def test_save_submission_video_rejects_sandbox_symlink_output(app, tmp_path, monkeypatch):
    """A parser-controlled output link cannot expose a host file after sandbox exit."""
    import os
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils import file_uploads

    app.static_folder = str(tmp_path / "static")
    secret = tmp_path / "secret.txt"
    secret.write_text("private data")
    monkeypatch.setattr(file_uploads, "_get_ffmpeg_bin", lambda: "/usr/bin/ffmpeg")
    monkeypatch.setattr(file_uploads.shutil, "which", lambda tool: "/usr/bin/ffprobe" if tool == "ffprobe" else None)

    def fake_parser(tool, args, workdir, *, timeout):
        """Return valid metadata, then place a malicious symlink as the output."""
        if tool.endswith("ffprobe"):
            return b"320,240" if "stream=width,height" in args else b"1.0"
        os.symlink(secret, os.path.join(workdir, "output.mp4"))
        return b""

    monkeypatch.setattr(file_uploads, "_run_video_tool", fake_parser)
    upload = FileStorage(stream=BytesIO(b"fake"), filename="clip.mp4", content_type="video/mp4")

    with pytest.raises(ValueError, match="Invalid or corrupted"):
        file_uploads.save_submission_video(upload)
    assert secret.read_text() == "private data"
    assert not list((tmp_path / "static" / "videos" / "verifications").iterdir())


def test_save_submission_image_invalid_extension(app, tmp_path):
    """Uploading a non-image file should raise a ValueError."""
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_image

    fake_file = BytesIO(b"{}")
    file = FileStorage(
        stream=fake_file,
        filename="bad.json",
        content_type="application/json",
    )

    with pytest.raises(ValueError):
        save_submission_image(file)


def test_save_submission_image_disallowed_mimetype(app):
    """Reject images with disallowed MIME types."""
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_image

    img_data = BytesIO(b"0" * 10)
    file = FileStorage(stream=img_data, filename="ok.png", content_type="application/octet-stream")

    with pytest.raises(ValueError):
        save_submission_image(file)


def test_allowed_image_file_heif():
    """HEIF and HEIC images should be rejected."""
    assert not allowed_image_file("photo.heif")
    assert not allowed_image_file("image.HEIC")


def test_save_submission_image_too_large(app):
    """Images larger than the limit should be rejected."""
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from app.utils.file_uploads import save_submission_image, MAX_IMAGE_BYTES

    big_data = BytesIO(b"0" * (MAX_IMAGE_BYTES + 1))
    file = FileStorage(stream=big_data, filename="big.jpg", content_type="image/jpeg")

    with pytest.raises(ValueError):
        save_submission_image(file)


def test_save_submission_image_too_many_pixels(app):
    """Images exceeding pixel dimensions should be rejected."""
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from PIL import Image
    from app.utils.file_uploads import save_submission_image

    img = Image.new("RGB", (MAX_IMAGE_DIMENSION + 1, MAX_IMAGE_DIMENSION + 1))
    buf = BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    file = FileStorage(stream=buf, filename="big.png", content_type="image/png")

    with pytest.raises(ValueError):
        save_submission_image(file)


def test_get_int_param_parsing(app):
    """Ensure get_int_param converts values safely."""
    with app.test_request_context('/?a=1&b=&c=foo'):
        assert get_int_param('a') == 1
        assert get_int_param('b') is None
        assert get_int_param('c') is None
        assert get_int_param('missing', default=7) == 7


def test_get_int_param_non_negative(app):
    """Values below ``min_value`` should fall back to the default."""
    with app.test_request_context('/?a=-5&b=10'):
        assert get_int_param('a', default=0, min_value=0) == 0
        assert get_int_param('a', min_value=0) is None
        assert get_int_param('b', min_value=0) == 10


def test_delete_media_file_local(app, tmp_path):
    app.static_folder = tmp_path
    file_path = tmp_path / "images" / "verifications"
    file_path.mkdir(parents=True)
    img = file_path / "foo.png"
    img.write_bytes(b"1")

    delete_media_file("images/verifications/foo.png")
    assert not img.exists()


def test_delete_media_file_gcs(app, monkeypatch):
    called = {}

    def fake_delete(path):
        called["path"] = path

    monkeypatch.setattr("app.utils.file_uploads._delete_from_gcs", fake_delete)
    app.config["GCS_BUCKET"] = "bucket"
    url = "https://storage.googleapis.com/bucket/images/foo.png"

    delete_media_file(url)
    assert called.get("path") == "images/foo.png"


def test_save_game_logo(app, tmp_path):
    from io import BytesIO
    from werkzeug.datastructures import FileStorage
    from PIL import Image

    app.static_folder = tmp_path
    img = Image.new("RGB", (1, 1), color="white")
    buf = BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    file = FileStorage(stream=buf, filename="logo.png", content_type="image/png")

    path = save_game_logo(file)
    assert path.startswith("images/game_logos/")
    assert (tmp_path / path).exists()
