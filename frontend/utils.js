export function getCSRFToken() {
  const el = document.querySelector('meta[name="csrf-token"]');
  return el ? el.getAttribute('content') : '';
}

export function isDebugMode() {
  const meta = document.querySelector('meta[name="debug-mode"]');
  return meta?.getAttribute('content') === 'true';
}

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;

function normalizeUrlInput(url) {
  if (typeof url !== 'string') {
    return null;
  }

  const value = url.trim();
  if (!value || CONTROL_CHARS.test(value)) {
    return null;
  }

  return value;
}

function buildSafeHttpUrl(
  url,
  { allowRelative = false, sameOriginOnly = false, preferRelative = true } = {}
) {
  const value = normalizeUrlInput(url);
  if (!value) {
    return null;
  }

  try {
    const parsed = allowRelative
      ? new URL(value, window.location.origin)
      : new URL(value);

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    if (parsed.username || parsed.password) {
      return null;
    }
    if (sameOriginOnly && parsed.origin !== window.location.origin) {
      return null;
    }
    if (preferRelative && parsed.origin === window.location.origin) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    return parsed.href;
  } catch {
    return null;
  }
}

export function getSafeSameOriginPath(url) {
  return buildSafeHttpUrl(url, { allowRelative: true, sameOriginOnly: true });
}

export function getSafeMediaUrl(url) {
  return buildSafeHttpUrl(url, { allowRelative: true });
}

export function getSafeExternalUrl(url) {
  return buildSafeHttpUrl(url, { preferRelative: false });
}

export async function fetchJson(url, options = {}) {
  const headers = { Accept: 'application/json', ...(options.headers || {}) };
  const opts = {
    credentials: 'same-origin',
    cache: 'no-store',
    ...options,
    headers,
  };
  const res = await fetch(url, opts);
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

export async function csrfFetchJson(url, options = {}) {
  const headers = { ...(options.headers || {}) };
  headers['X-CSRF-Token'] = getCSRFToken();
  return fetchJson(url, { ...options, headers });
}

export function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
