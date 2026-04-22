import{a as e,c as t,i as n,n as r,o as i,p as a,r as o,t as s,u as c}from"./chunk-BP2-OPvb.js";var l=Object.defineProperty,u=(e,t)=>{let n={};for(var r in e)l(n,r,{get:e[r],enumerable:!0});return t||l(n,Symbol.toStringTag,{value:`Module`}),n};function d(e){let n=document.getElementById(`game_IdHolder`),r=n?n.getAttribute(`data-game-id`):null,i=r&&!isNaN(parseInt(r,10))&&r!==`0`?`?game_id=${r}`:``;fetch(`/profile/${e}${i}`).then(e=>e.json()).then(n=>{if(!n.riding_preferences_choices){a.error(`Riding preferences choices missing.`);return}let r=document.getElementById(`userProfileDetails`);if(!r){a.error(`Profile details containers not found`);return}let i=n.current_user_id===n.user.id;r.innerHTML=`
          <!-- XS: native select dropdown -->
          <div class="d-block d-sm-none mb-3">
            <select id="profileTabSelect" class="form-select">
              <option value="profile" selected>Profile</option>
              <option value="bike">Bike</option>
              ${n.has_badges?`<option value="badges-earned">Badges Earned</option>`:``}
              <option value="games-participated">Games Participated</option>
              <option value="quest-submissions">Quest Submissions</option>
            </select>
          </div>

          <!-- SM+ nav-tabs (will scroll horizontally) -->
          <ul class="nav nav-tabs epic-tabs d-none d-sm-flex" id="profileTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <a class="nav-link active" id="profile-tab" data-bs-toggle="tab"
                href="#profile" role="tab" aria-controls="profile" aria-selected="true">
                <i class="bi bi-person-circle me-2"></i>Profile
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="bike-tab" data-bs-toggle="tab"
                 href="#bike" role="tab" aria-controls="bike" aria-selected="false">
                <i class="bi bi-bicycle me-2"></i>Bike
              </a>
            </li>
            ${n.has_badges?`
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="badges-earned-tab" data-bs-toggle="tab"
                 href="#badges-earned" role="tab" aria-controls="badges-earned" aria-selected="false">
                <i class="bi bi-trophy me-2"></i>Badges Earned
              </a>
            </li>`:``}
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="games-participated-tab" data-bs-toggle="tab"
                 href="#games-participated" role="tab" aria-controls="games-participated" aria-selected="false">
                <i class="bi bi-controller me-2"></i>Games Participated
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="quest-submissions-tab" data-bs-toggle="tab"
                 href="#quest-submissions" role="tab" aria-controls="quest-submissions" aria-selected="false">
                <i class="bi bi-list-quest me-2"></i>Quest Submissions
              </a>
            </li>
          </ul>

          <div class="tab-content bg-light p-4 rounded shadow-sm" id="profileTabsContent">

            <!-- 1) PROFILE pane -->
            <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <section class="profile mb-4">
                ${i?`
                  <div id="profileViewMode">
                    ${n.user.profile_picture?`
                      <div class="profile-picture-container position-relative mx-auto mb-3">
                        <img src="/static/${n.user.profile_picture}"
                            class="profile-picture rounded-circle shadow-lg border border-white border-4"
                            alt="Profile Picture">
                      </div>`:``}
                    <p><strong>Display Name:</strong> ${n.user.display_name||``}</p>
                    <p><strong>Age Group:</strong> ${n.user.age_group||``}</p>
                    <p><strong>Timezone:</strong> ${n.user.timezone||``}</p>
                    <p><strong>Interests:</strong> ${n.user.interests||``}</p>
                    <p><strong>Riding Preferences:</strong> ${n.user.riding_preferences.join(`, `)}</p>
                    <p><strong>Ride Description:</strong> ${n.user.ride_description||``}</p>
                    <button class="btn btn-primary" id="editProfileBtn">Edit</button>
                  </div>
                  <div id="profileEditMode" class="d-none">
                    <form id="editProfileForm" method="post" enctype="multipart/form-data" class="needs-validation" novalidate>
                      <div class="form-group mb-3">
                        <label for="profilePictureInput">Profile Picture:</label>
                        <input type="file" class="form-control" id="profilePictureInput"
                                name="profile_picture" accept="image/*">
                      </div>
                      <div class="form-group mb-3">
                        <label for="displayName">Display Name:</label>
                        <input type="text" class="form-control" id="displayName" name="display_name"
                                value="${n.user.display_name||``}" required>
                        <div class="invalid-feedback">Display Name is required.</div>
                      </div>
                      <div class="form-group mb-3">
                        <label for="ageGroup">Age Group:</label>
                        <select class="form-select" id="ageGroup" name="age_group">
                          <option value="teen" ${n.user.age_group===`teen`?`selected`:``}>Teen</option>
                          <option value="adult" ${n.user.age_group===`adult`?`selected`:``}>Adult</option>
                          <option value="senior" ${n.user.age_group===`senior`?`selected`:``}>Senior</option>
                        </select>
                      </div>
                      <div class="form-group mb-3">
                        <label for="timezone">Timezone:</label>
                        <select class="form-select" id="timezone" name="timezone">
                          ${n.timezone_choices.map(e=>`
                            <option value="${e}" ${n.user.timezone===e?`selected`:``}>${e}</option>
                          `).join(``)}
                        </select>
                      </div>
                      <div class="form-group mb-3">
                        <label for="interests">Interests:</label>
                        <textarea class="form-control" id="interests" name="interests" rows="3"
                                  placeholder="Describe your interests...">${n.user.interests||``}</textarea>
                      </div>
                      <div class="form-group mb-3">
                        <label><b>Please specify your riding preferences:</b></label>
                        <div id="ridingPreferences">
                          ${n.riding_preferences_choices.map((e,t)=>`
                            <div class="form-check mb-2">
                              <input class="form-check-input" type="checkbox"
                                      id="ridingPref-${t}" name="riding_preferences"
                                      value="${e[0]}"
                                      ${n.user.riding_preferences.includes(e[0])?`checked`:``}>
                              <label class="form-check-label" for="ridingPref-${t}">${e[1]}</label>
                            </div>
                          `).join(``)}
                        </div>
                      </div>
                      <div class="form-group mb-3">
                        <label for="rideDescription">Describe the type of riding you like to do:</label>
                        <textarea class="form-control" id="rideDescription" name="ride_description" rows="3">${n.user.ride_description||``}</textarea>
                      </div>
                      <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="uploadToSocials" name="upload_to_socials"
                                ${n.user.upload_to_socials?`checked`:``}>
                        <label class="form-check-label" for="uploadToSocials">Cross post to game's social media?</label>
                      </div>
                      <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="uploadToMastodon" name="upload_to_mastodon"
                                ${n.user.upload_to_mastodon?`checked`:``}>
                        <label class="form-check-label" for="uploadToMastodon">Cross post to your federation server?</label>
                      </div>
                      ${n.user.is_admin?``:`
                      <div class="mb-3">
                        <button type="button" class="btn btn-warning" id="upgradeToAdminBtn"
                                data-bs-toggle="modal" data-bs-target="#upgradeAdminModal">
                          Upgrade to Admin
                        </button>
                      </div>
                      <div class="modal fade" id="upgradeAdminModal" tabindex="-1"
                           aria-labelledby="upgradeAdminModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="upgradeAdminModalLabel">Upgrade to Admin</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                      aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <p>PayPal subscription integration coming soon.</p>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>`}
                      <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-success" id="saveProfileBtn">
                          <i class="bi bi-save me-2"></i>Save Profile
                        </button>
                        <button type="button" class="btn btn-secondary" id="cancelProfileBtn">Cancel</button>
                      </div>
                    </form>
                    <hr>
                    <form id="updatePasswordForm" class="d-flex justify-content-between">
                      <button class="btn btn-primary w-100 me-2" id="updatePasswordBtn">
                        <i class="bi bi-shield-lock-fill me-2"></i>Update Password
                      </button>
                    </form>
                    <hr>
                    <form id="deleteAccountForm">
                      <button class="btn btn-danger w-100">
                        <i class="bi bi-trash-fill me-2"></i>Delete My Account
                      </button>
                    </form>
                  </div>`:`
                  <div id="profileViewMode">
                    ${n.user.profile_picture?`
                    <div class="profile-picture-container position-relative mx-auto mb-3">
                      <img src="/static/${n.user.profile_picture}"
                          class="profile-picture rounded-circle shadow-lg border border-white border-4"
                          alt="Profile Picture">
                    </div>`:``}
                    <p><strong>Display Name:</strong> ${n.user.display_name||``}</p>
                    <p><strong>Age Group:</strong> ${n.user.age_group||``}</p>
                    <p><strong>Timezone:</strong> ${n.user.timezone||``}</p>
                    <p><strong>Interests:</strong> ${n.user.interests||``}</p>
                    <p><strong>Riding Preferences:</strong> ${n.user.riding_preferences.join(`, `)}</p>
                    <p><strong>Ride Description:</strong> ${n.user.ride_description||``}</p>
                  </div>
                `}
              </section>
            </div>

            <!-- 2) BIKE pane -->
            <div class="tab-pane fade" id="bike" role="tabpanel" aria-labelledby="bike-tab">
              <section class="bike mb-4">
                <h2 class="h2">Bike Details</h2>
                ${i?`
                  <form id="editBikeForm" class="needs-validation" novalidate>
                    <div class="form-group mb-3">
                      <label for="bikePicture">Upload Your Bicycle Picture:</label>
                      <input type="file" class="form-control" id="bikePicture" name="bike_picture" accept="image/*">
                    </div>
                    ${n.user.bike_picture?`
                      <div class="form-group mb-3">
                        <label>Current Bicycle Picture:</label>
                        <img src="/static/${n.user.bike_picture}" class="img-fluid rounded shadow-sm" alt="Bicycle Picture">
                      </div>`:``}
                    <div class="form-group mb-3">
                      <label for="bikeDescription">Bicycle Description:</label>
                      <textarea class="form-control" id="bikeDescription" name="bike_description" rows="3">${n.user.bike_description||``}</textarea>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button class="btn btn-success" id="saveBikeBtn">
                        <i class="bi bi-save me-2"></i>Save Bike Details
                      </button>
                    </div>
                  </form>`:`
                  <p><strong>Bicycle Description:</strong> ${n.user.bike_description||``}</p>`}
              </section>
            </div>

            ${n.has_badges?`
            <!-- 3) BADGES EARNED pane -->
            <div class="tab-pane fade" id="badges-earned" role="tabpanel" aria-labelledby="badges-earned-tab">
              <section class="badges-earned mb-4">
                <h2 class="h2">Badges Earned</h2>
                <div class="badge-grid">
                  ${n.user.badges&&n.user.badges.length?n.user.badges.map(e=>`
                      <div class="badge-card">
                        <img src="/static/images/badge_images/${e.image}" alt="${e.name}" class="badge-icon" style="width:100px;">
                        <div class="badge-caption">
                          <h3>${e.name}</h3>
                          <p>${e.description}</p>
                          <p><strong>Category:</strong> ${e.category}</p>
                        </div>
                      </div>
                    `).join(``):`<p class="text-muted">No badges earned yet.</p>`}
                </div>
              </section>
            </div>
            `:``}

            <!-- 4) GAMES PARTICIPATED pane -->
            <div class="tab-pane fade" id="games-participated" role="tabpanel" aria-labelledby="games-participated-tab">
              <section class="games-participated mb-4">
                <h2 class="h2">Games Participated</h2>
                <div class="row g-3">
                  ${n.participated_games&&n.participated_games.length?n.participated_games.map(e=>`
                      <div class="game-item col-md-6 p-3 border rounded shadow-sm bg-white">
                        <h3 class="h5">${e.title}</h3>
                        <p class="text-muted">${e.description}</p>
                        <p><strong>Start Date:</strong> ${e.start_date}</p>
                        <p><strong>End Date:</strong> ${e.end_date}</p>
                      </div>
                    `).join(``):`<p class="text-muted">No games participated in yet.</p>`}
                </div>
              </section>
            </div>

            <!-- 5) QUEST SUBMISSIONS pane -->
            <div class="tab-pane fade" id="quest-submissions" role="tabpanel" aria-labelledby="quest-submissions-tab">
              <section class="quest-submissions mb-4">
                <h2 class="h2">Quest Submissions</h2>
                <div class="row g-3">
                  ${n.quest_submissions&&n.quest_submissions.length?n.quest_submissions.map(e=>`
                      <div class="submission-item col-md-6 p-3 border rounded shadow-sm bg-white">
                        ${e.image_url?`<img src="${e.image_url}" alt="Submission Image" class="img-fluid rounded mb-2" style="max-height:200px; object-fit:cover;">`:``}
                        <p><strong>Quest:</strong> ${e.quest.title}</p>
                        <p class="text-muted">${e.comment}</p>
                        <p><strong>Submitted At:</strong> ${e.timestamp}</p>
                        <div class="d-flex gap-2">
                          ${e.twitter_url?`<a href="${e.twitter_url}"   target="_blank" class="btn btn-sm btn-twitter"><i class="bi bi-twitter"></i></a>`:``}
                          ${e.fb_url?`<a href="${e.fb_url}"        target="_blank" class="btn btn-sm btn-facebook"><i class="bi bi-facebook"></i></a>`:``}
                          ${e.instagram_url?`<a href="${e.instagram_url}" target="_blank" class="btn btn-sm btn-instagram"><i class="bi bi-instagram"></i></a>`:``}
                        </div>
                        ${i?`<button class="btn btn-danger btn-sm mt-2" data-delete-submission="${e.id}">Delete</button>`:``}
                      </div>
                    `).join(``):`<p class="text-muted">No quest submissions yet.</p>`}
                </div>
              </section>
            </div>

          </div> <!-- /.tab-content -->
        </div> <!-- /.row -->
      `;let s=document.getElementById(`userProfileModalLabel`);s.textContent=`${n.user.display_name||n.user.username}'s Profile`;let c=document.getElementById(`followBtn`);c&&(c.style.display=``);let l=document.getElementById(`followerCount`),u=n.user.follower_count;function d(){l&&(l.textContent=`${u} follower${u===1?``:`s`}`)}if(d(),!i&&c){c&&(c.style.display=``,c.classList.remove(`d-none`));let e=n.current_user_following;function t(){e?(c.textContent=`Following`,c.classList.remove(`btn-primary`),c.classList.add(`btn-outline-primary`)):(c.textContent=`Follow`,c.classList.remove(`btn-outline-primary`),c.classList.add(`btn-primary`))}t(),c.onclick=async()=>{let r=e?`unfollow`:`follow`,{status:i}=await o(`/profile/${n.user.username}/${r}`,{method:`POST`,headers:{"Content-Type":`application/json`}});if(i!==200){a.error(`Follow toggle failed`);return}e=!e,u+=e?1:-1,t(),d()}}else{let e=document.getElementById(`followBtn`);e&&(e.style.display=`none`)}t(`userProfileModal`);let v=document.getElementById(`editProfileBtn`);v&&v.addEventListener(`click`,f);let y=document.getElementById(`saveProfileBtn`);y&&y.addEventListener(`click`,()=>m(e));let b=document.getElementById(`cancelProfileBtn`);b&&b.addEventListener(`click`,t=>{t.preventDefault(),p(e)});let x=document.getElementById(`updatePasswordBtn`);x&&x.addEventListener(`click`,()=>{window.location.href=`/auth/update_password`});let S=document.getElementById(`saveBikeBtn`);S&&S.addEventListener(`click`,()=>h(e)),document.querySelectorAll(`[data-delete-submission]`).forEach(e=>{e.addEventListener(`click`,()=>{g(e.getAttribute(`data-delete-submission`),`profileSubmissions`,n.user.id)})});let C=document.getElementById(`deleteAccountForm`);C&&C.addEventListener(`submit`,e=>{e.preventDefault(),_()});let w=document.getElementById(`profileTabSelect`);w&&(w.addEventListener(`change`,e=>{let t=e.target.value,n=document.querySelector(`#profileTabs a[href="#${t}"]`);n&&new bootstrap.Tab(n).show()}),document.querySelectorAll(`#profileTabs a[data-bs-toggle="tab"]`).forEach(e=>{e.addEventListener(`shown.bs.tab`,e=>{w.value=e.target.getAttribute(`href`).slice(1)})}))}).catch(e=>{a.error(`Failed to load profile:`,e),alert(`Could not load user profile. Please try again.`)})}document.querySelectorAll(`[data-floating-ui-tooltip]`).forEach(e=>{tippy(e,{content:e.getAttribute(`data-floating-ui-tooltip`),placement:`top`,animation:`scale-subtle`})}),document.querySelectorAll(`.needs-validation`).forEach(e=>{e.addEventListener(`submit`,t=>{e.checkValidity()||(t.preventDefault(),t.stopPropagation()),e.classList.add(`was-validated`)},!1)});function f(){let e=document.getElementById(`profileViewMode`),t=document.getElementById(`profileEditMode`);if(!e||!t){a.error(`Profile edit mode elements missing`);return}e.classList.toggle(`d-none`),t.classList.toggle(`d-none`)}function p(e){d(e)}function m(e){let t=document.getElementById(`editProfileForm`);if(!t){a.error(`Edit profile form not found`);return}let n=new FormData(t),r=document.getElementById(`profilePictureInput`);r.files.length>0&&n.append(`profile_picture`,r.files[0]);let i=[];t.querySelectorAll(`input[name="riding_preferences"]:checked`).forEach(e=>{i.push(e.value)}),n.delete(`riding_preferences`),i.forEach(e=>{n.append(`riding_preferences`,e)}),o(`/profile/${e}/edit`,{method:`POST`,body:n}).then(({json:t})=>{if(t.error){let e=`Error: ${t.error}`;if(t.details){let n=[];Object.values(t.details).forEach(e=>{n.push(e.join(`, `))}),n.length&&(e+=` - ${n.join(`; `)}`)}alert(e)}else alert(`Profile updated successfully.`),d(e)}).catch(e=>{a.error(`Error updating profile:`,e),alert(`Failed to update profile. Please try again.`)})}function h(e){let t=document.getElementById(`editBikeForm`);if(!t){a.error(`Edit bike form not found`);return}let n=new FormData(t),r=document.getElementById(`bikePicture`);r.files.length>0&&n.append(`bike_picture`,r.files[0]),o(`/profile/${e}/edit-bike`,{method:`POST`,body:n}).then(({json:t})=>{t.error?alert(`Error: ${t.error}`):(alert(`Bike details updated successfully.`),d(e))}).catch(e=>{a.error(`Error updating bike details:`,e),alert(`Failed to update bike details. Please try again.`)})}function g(e,t,n){o(`/quests/quest/delete_submission/${e}`,{method:`POST`}).then(({json:e})=>{if(e.success)alert(`Submission deleted successfully.`),t===`profileSubmissions`&&d(n);else throw Error(e.message)}).catch(e=>{a.error(`Error deleting submission:`,e),alert(`Error during deletion: `+e.message)})}function _(){confirm(`Are you sure you want to delete your account? This action cannot be undone.`)&&o(`/auth/delete_account`,{method:`POST`,headers:{"Content-Type":`application/json`}}).then(()=>{window.location.href=`/`}).catch(e=>{a.error(`Error deleting account:`,e),alert(`Failed to delete account. Please try again.`)})}document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-user-profile]`);if(!t)return;let n=document.body.dataset.userId;if(!n||n===`none`)return;e.preventDefault();let r=t.getAttribute(`data-user-profile`);r&&d(r)});var v=u({openQuestDetailModal:()=>C,refreshQuestDetailModal:()=>w});function y(e){let t=document.querySelector(`meta[name="${e}"]`);return t?t.content:``}var b=Number(y(`current-user-id`)||0),x=e(),S=document.querySelector(`meta[name="placeholder-image"]`).getAttribute(`content`);function C(e){c(),n(`/quests/detail/${encodeURIComponent(e)}/user_completion`).then(({json:n})=>{let{quest:r,userCompletion:i,canVerify:o,nextEligibleTime:s}=n;if(!E(r,i.completions,o,e,s)){a.error(`populateQuestDetails – required element missing`);return}D(r,i.completions,s,o),t(`questDetailModal`),T(),U(e)}).catch(e=>{a.error(`Error opening quest detail modal:`,e),alert(`Sign in to view quest details.`)})}function w(e){n(`/quests/detail/${encodeURIComponent(e)}/user_completion`).then(({json:t})=>{let{quest:n,userCompletion:r,canVerify:i,nextEligibleTime:o}=t;if(!E(n,r.completions,i,e,o)){a.error(`populateQuestDetails - required element missing`);return}D(n,r.completions,o,i),T(),U(e)}).catch(e=>{a.error(`Failed to refresh quest detail modal:`,e)})}function T(){let e=document.querySelectorAll(`img.lazyload`),t=new IntersectionObserver((e,t)=>{e.forEach(e=>{if(e.isIntersecting){let n=e.target;n.src=n.getAttribute(`data-src`),n.classList.remove(`lazyload`),t.unobserve(n)}})});e.forEach(e=>{t.observe(e)})}function E(e,t,n,r,i){let o=t>=e.completion_limit?` - complete`:``,s={modalQuestTitle:document.getElementById(`modalQuestTitle`),modalQuestDescription:document.getElementById(`modalQuestDescription`),modalQuestTips:document.getElementById(`modalQuestTips`),modalQuestPoints:document.getElementById(`modalQuestPoints`),modalQuestCompletionLimit:document.getElementById(`modalQuestCompletionLimit`),modalQuestBadgeAwarded:document.getElementById(`modalQuestBadgeAwarded`),modalQuestCategory:document.getElementById(`modalQuestCategory`),modalQuestVerificationType:document.getElementById(`modalQuestVerificationType`),modalQuestBadgeImage:document.getElementById(`modalQuestBadgeImage`),modalQuestCompletions:document.getElementById(`modalQuestCompletions`),modalCountdown:document.getElementById(`modalCountdown`)};for(let e in s)if(!s[e])return a.error(`Error: Missing element ${e}`),!1;let c={badge:s.modalQuestBadgeImage?.closest(`.quest-detail-item`),badgeAwarded:s.modalQuestBadgeAwarded?.closest(`.quest-detail-item`),category:s.modalQuestCategory?.closest(`.quest-detail-item`)};for(let e in c)if(!c[e])return a.error(`Error: Missing card element ${e}`),!1;s.modalQuestTitle.innerText=`${e.title}${o}`,s.modalQuestDescription.textContent=e.description,s.modalQuestTips.textContent=e.tips||`No tips available`,s.modalQuestPoints.innerText=`${e.points}`,s.modalQuestCategory.innerText=e.category||`No category set`;let l=e.completion_limit>1?`${e.completion_limit} times`:`${e.completion_limit} time`;s.modalQuestCompletionLimit.innerText=`${l} ${e.frequency}`;let u=e.badge_awarded>1?`${e.badge_awarded} times`:`${e.badge_awarded} time`;switch(e.badge_awarded==null?s.modalQuestBadgeAwarded.innerText=`No badge awarded`:s.modalQuestBadgeAwarded.innerText=`After ${u}`,e.verification_type){case`photo_comment`:s.modalQuestVerificationType.innerText=`Must upload a photo to earn points! Comment optional.`;break;case`photo`:s.modalQuestVerificationType.innerText=`Must upload a photo to earn points!`;break;case`comment`:s.modalQuestVerificationType.innerText=`Must upload a comment to earn points!`;break;case`qr_code`:s.modalQuestVerificationType.innerText=`Find the QR code and post a photo to earn points!`;break;default:s.modalQuestVerificationType.innerText=`Not specified`;break}let d=e.badge&&e.badge.image?`/static/images/badge_images/${e.badge.image}`:S;s.modalQuestBadgeImage.setAttribute(`data-src`,d),s.modalQuestBadgeImage.src=S,s.modalQuestBadgeImage.classList.add(`lazyload`),s.modalQuestBadgeImage.alt=e.badge&&e.badge.name?`Badge: ${e.badge.name}`:`Default Badge`,e.badge_option===`none`?(c.badge.classList.add(`hidden`),c.badgeAwarded.classList.add(`hidden`),c.category.classList.add(`hidden`)):(c.badge.classList.remove(`hidden`),c.badgeAwarded.classList.remove(`hidden`),c.category.classList.remove(`hidden`)),s.modalQuestCompletions.innerText=`Total Completions: ${t}`;let f=i&&new Date(i);return!n&&f&&f>new Date?(s.modalCountdown.innerText=`Next eligible time: ${f.toLocaleString()}`,s.modalCountdown.style.color=`red`):(s.modalCountdown.innerText=`You are currently eligible to verify!`,s.modalCountdown.style.color=`green`),A(r,n,e.verification_type),!0}function D(e,t,n,r){let i=document.querySelector(`.user-quest-data`);if(!i){a.error(`Parent element .user-quest-data not found`);return}[{id:`modalQuestCompletions`,value:`${t||0}`},{id:`modalCountdown`,value:``}].forEach(e=>{let t=document.getElementById(e.id);t||(t=document.createElement(`p`),t.id=e.id,i.appendChild(t)),t.innerText=e.value}),O(document.getElementById(`modalCountdown`),n,r)}function O(e,t,n){if(!n&&t){let n=new Date(t),r=new Date;n>r?e.innerText=`Next eligible time: ${k(n-r)}`:e.innerText=`You are currently eligible to verify!`}else e.innerText=`You are currently eligible to verify!`}function k(e){let t=Math.floor(e/1e3%60),n=Math.floor(e/(1e3*60)%60),r=Math.floor(e/(1e3*60*60)%24);return`${Math.floor(e/(1e3*60*60*24))}d ${r}h ${n}m ${t}s`}function A(e,t,n){let r=document.querySelector(`.user-quest-data`);if(!r){a.error(`Parent element .user-quest-data not found`);return}if(r.innerHTML=``,t){let t=document.createElement(`div`);t.id=`verifyQuestForm-${e}`,t.className=`verify-quest-form`,t.style.display=`block`;let i=j(n.trim().toLowerCase(),e);t.appendChild(i),r.appendChild(t),F(e)}else{let e=document.createElement(`p`);e.className=`epic-message text-success`,e.textContent=`Thanks for completing the quest.`,r.appendChild(e)}}function j(e,t){let n=document.createElement(`form`);n.enctype=`multipart/form-data`,n.className=`epic-form`,n.method=`post`,n.action=`/quests/quest/${encodeURIComponent(t)}/submit`;let r=document.createElement(`input`);r.type=`hidden`,r.name=`csrf_token`,r.value=x,n.appendChild(r);let i=document.createElement(`h2`);switch(i.style.textAlign=`center`,i.textContent=`Verify Your Quest`,n.appendChild(i),e){case`photo`:n.appendChild(M(`image`,`Upload a Photo`,`image/*`,!0)),n.appendChild(P());break;case`comment`:n.appendChild(N(`verificationComment`,`Enter a Comment`,`Enter a comment...`,!0)),n.appendChild(P());break;case`photo_comment`:n.appendChild(M(`image`,`Upload a Photo`,`image/*`,!0)),n.appendChild(N(`verificationComment`,`Enter a Comment (optional)`,`Enter a comment...`,!1)),n.appendChild(P());break;case`video`:n.appendChild(M(`video`,`Upload a Video`,`video/*`,!0)),n.appendChild(N(`verificationComment`,`Add a Comment (optional)`,`Enter an optional comment...`,!1)),n.appendChild(P());break;case`qr_code`:{let e=document.createElement(`p`);e.className=`epic-message`,e.textContent=`Find and scan the QR code. No submission required here.`,n.appendChild(e);break}case`pause`:{let e=document.createElement(`p`);e.className=`epic-message`,e.textContent=`Quest is currently paused.`,n.appendChild(e);break}default:{let e=document.createElement(`p`);e.className=`epic-message`,e.textContent=`Submission requirements are not set correctly.`,n.appendChild(e)}}return n}function M(e,t,n,r){let i=document.createElement(`div`);i.className=`form-group`;let a=document.createElement(`label`);a.htmlFor=e,a.className=`epic-label`,a.textContent=t,i.appendChild(a);let o=document.createElement(`input`);return o.type=`file`,o.id=e,o.name=e,o.className=`epic-input`,o.accept=n,r&&(o.required=!0),i.appendChild(o),i}function N(e,t,n,r){let i=document.createElement(`div`);i.className=`form-group`;let a=document.createElement(`label`);a.htmlFor=e,a.className=`epic-label`,a.textContent=t,i.appendChild(a);let o=document.createElement(`textarea`);return o.id=e,o.name=e,o.className=`epic-textarea`,o.placeholder=n,r&&(o.required=!0),i.appendChild(o),i}function P(){let e=document.createElement(`div`);e.className=`form-group`;let t=document.createElement(`button`);return t.type=`submit`,t.textContent=`Submit Verification`,e.appendChild(t),e}function F(e){let t=document.getElementById(`verifyQuestForm-${e}`);if(!t){a.error(`Form container not found for quest ID:`,e);return}let n=t.querySelector(`form`);if(!n){a.error(`Form element missing for quest ID:`,e);return}n.addEventListener(`submit`,function(t){V(t,e)})}function I(e,t){e&&(t&&t.trim()?(e.href=t,e.style.display=`inline`):e.style.display=`none`)}function L(e){if(typeof e!=`number`)return;let t=document.getElementById(`total-points`);if(!t)return;let n=t.querySelector(`.points-emphasized`);n?n.textContent=e:t.textContent=`Your Carbon Reduction Points: ${e}`}function R(e,t,n){let r=document.querySelector(`#questTableBody tr[data-quest-id="${e}"]`);if(!r)return;let i=r.querySelectorAll(`.quest-stats-cell`);i.length>=2&&(i[0].innerText=t,i[1].innerText=n)}function z(e){I(document.getElementById(`twitterLink`),e.twitter_url),I(document.getElementById(`facebookLink`),e.fb_url),I(document.getElementById(`instagramLink`),e.instagram_url)}var B=!1;async function V(e,t){if(e.preventDefault(),B)return;B=!0;let n=e.target.querySelector(`[type="submit"]`);n&&(n.disabled=!0);try{r(`Uploading...`);let n=e.target.querySelector(`input[type="file"]`),i=n?n.files[0]:null;if(i&&i.type.startsWith(`video/`)&&i.size>25*1024*1024){alert(`Video must be 25 MB or smaller.`);return}if(i&&i.type.startsWith(`image/`)&&i.size>8*1024*1024){alert(`Image must be 8 MB or smaller.`);return}if(i&&i.type.startsWith(`video/`))try{let e=await H(i);if(isFinite(e)&&e>10){alert(`Video must be 10 seconds or shorter.`);return}}catch{alert(`Unable to read video metadata. Please try another file.`);return}let a=new FormData(e.target);a.append(`user_id`,b);let{status:s,json:c}=await o(`/quests/quest/${encodeURIComponent(t)}/submit`,{method:`POST`,body:a});if(s!==200)throw s===403&&c.message===`This quest cannot be completed outside of the game dates`?Error(`The game has ended and you can no longer submit quests. Join a new game in the game dropdown menu.`):Error(c.message||`Server responded with status ${s}`);if(!c.success||!c.success)throw Error(c.message);L(c.total_points),z(c),R(t,c.new_completion_count,c.total_completion_count),w(t),e.target.reset()}catch(e){a.error(`Submission error:`,e),alert(`Error during submission: ${e.message}`)}finally{B=!1,n&&(n.disabled=!1),s()}}function H(e){return new Promise((t,n)=>{try{let r=URL.createObjectURL(e),i=document.createElement(`video`);i.preload=`metadata`,i.onloadedmetadata=()=>{URL.revokeObjectURL(r),t(i.duration||0)},i.onerror=()=>{URL.revokeObjectURL(r),n(Error(`metadata error`))},i.src=r}catch(e){n(e)}})}async function U(e){let t=encodeURIComponent(e);try{let{json:r}=await n(`/quests/quest/${t}/submissions`),i=document.getElementById(`twitterLink`),a=document.getElementById(`facebookLink`),o=document.getElementById(`instagramLink`);if(r&&r.length){let e=r[0],t=document.getElementById(`submissionImage`),n=document.getElementById(`submissionVideo`),i=document.getElementById(`submissionVideoSource`),a=document.getElementById(`submissionComment`),o=document.getElementById(`submitterProfileLink`),s=document.getElementById(`submitterProfileImage`),c=document.getElementById(`submitterProfileCaption`);e.video_url?(t.hidden=!0,n.hidden=!1,i.src=e.video_url,n.load()):(n.hidden=!0,t.hidden=!1,t.src=e.image_url||S),a.textContent=e.comment||`No comment provided.`,o&&o.tagName===`A`&&b?o.href=`/profile/${encodeURIComponent(e.user_id)}`:o&&o.removeAttribute(`href`),s.src=e.user_profile_picture||S,c.textContent=e.user_display_name||e.user_username||`User ${e.user_id}`,z(e)}else [i,a,o].forEach(e=>{e&&(e.style.display=`none`)});G(r.slice().reverse().map(t=>({id:t.id,url:t.image_url||(t.video_url?null:S),video_url:t.video_url,alt:`Submission Image`,comment:t.comment,user_id:t.user_id,user_display_name:t.user_display_name,user_username:t.user_username,user_profile_picture:t.user_profile_picture,twitter_url:t.twitter_url,fb_url:t.fb_url,instagram_url:t.instagram_url,quest_id:e})))}catch(e){a.error(`Failed to fetch submissions:`,e),alert(`Could not load submissions. Please try again.`)}}function W(e){if(!e)return a.error(`Invalid URL detected: ${e}`),!1;try{if(e.startsWith(`/`))return!0;let t=new URL(e);if(t.protocol===`http:`||t.protocol===`https:`)return[`.jpg`,`.jpeg`,`.png`,`.gif`,`.webp`].some(e=>t.pathname.toLowerCase().endsWith(e))}catch{return a.error(`Invalid URL detected: ${e}`),!1}return!1}function G(e){let t=document.getElementById(`submissionBoard`);if(!t){a.error(`submissionBoard element not found`);return}t.innerHTML=``;let n=document.getElementById(`questDetailModal`)?.getAttribute(`data-placeholder-url`)||S,r=W(n)?n:S,i=e=>e.startsWith(`/static/`),o=e=>e.replace(/^\/static\//,``),s=window.innerWidth<=480?70:100,c=Math.round(s*(window.devicePixelRatio||2));e.forEach(e=>{let n;if(e.video_url)n=document.createElement(`video`),n.src=e.video_url,n.preload=`metadata`,n.muted=!0,n.playsInline=!0,n.style.objectFit=`cover`;else{n=document.createElement(`img`);let t=W(e.url)?e.url:r,a=i(t)?`/resize_image?path=${encodeURIComponent(o(t))}&width=${c}`:t;n.src=S,n.setAttribute(`data-src`,a),n.classList.add(`lazyload`),n.alt=e.alt||`Submission Image`}n.style.width=`${s}px`,n.style.height=`auto`,n.style.marginRight=`10px`,e.video_url||(n.onerror=()=>{i(r)?n.src=`/resize_image?path=${encodeURIComponent(o(r))}&width=${c}`:n.src=encodeURI(r)}),n.onclick=()=>q(e),t.appendChild(n)}),T()}function K(e){e.querySelectorAll(`span, img`).forEach(e=>{e.classList.toggle(`hidden`)})}document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-quest-detail]`);if(t){e.preventDefault(),C(t.getAttribute(`data-quest-detail`));return}let n=e.target.closest(`[data-toggle-content]`);n&&n.closest(`#questDetailModal`)&&(e.preventDefault(),K(n))});var q,J=[],Y=-1,X=!1,Z=new Image,Q=null,$=null;document.addEventListener(`DOMContentLoaded`,()=>{let e=e=>document.querySelector(e);if(!e(`#submissionDetailModal`))return;let r=document.getElementById(`replyLimitMessage`),a=document.getElementById(`prevSubmissionBtn`),s=document.getElementById(`nextSubmissionBtn`),l=document.querySelector(`meta[name="placeholder-image"]`).getAttribute(`content`),u=()=>{let t=e(`#submissionImage`),n=e(`#submissionVideo`),r=e(`#submissionVideoSource`);t&&(t.onload=null,t.onerror=null,t.src=``),n&&r&&(n.onloadeddata=null,n.pause(),r.src=``,n.load()),Z.src=``},f=e=>{!a||!s||(e?(a.disabled=!0,s.disabled=!0):(a.disabled=Y<=0,s.disabled=Y>=J.length-1))},p=()=>{if(Z.src=``,!Array.isArray(J))return;let e=J[Y+1];!e||e.video_url||(Z.src=e.url)};q=function(n){let r=e(`#submissionDetailModal`);r.dataset.submissionId=n.id,r.dataset.questId=n.quest_id||``,X=!r.dataset.currentUserId||!!(n.read_only||n.readOnly),Array.isArray(n.album_items)&&(J=n.album_items,Y=Number.isInteger(n.album_index)?n.album_index:-1),u(),Q&&Q.abort(),$&&$.abort(),f(!0);let m=Number(r.dataset.currentUserId),g=Number(n.user_id)===m,_=r.dataset.isAdmin===`True`||r.dataset.isAdmin===`true`,v=e(`#editPhotoBtn`),y=e(`#photoEditControls`),b=e(`#submissionPhotoInput`),x=e(`#savePhotoBtn`),S=e(`#cancelPhotoBtn`),C=e(`#deleteSubmissionBtn`);v.hidden=!g||X,C.hidden=!(g||_),y.hidden=!0,v.onclick=()=>{y.hidden=!1,v.hidden=!0,b&&b.click()},S.onclick=()=>{b.value=``,y.hidden=!0,v.hidden=!1},C.onclick=()=>{if(!confirm(`Are you sure you want to delete this submission?`))return;let e=r.dataset.submissionId;o(`/quests/quest/delete_submission/${e}`,{method:`POST`}).then(({json:e})=>{if(!e.success)throw Error(e.message||`Delete failed`);i(`submissionDetailModal`),c(),r.dataset.questId&&w(r.dataset.questId),alert(`Submission deleted successfully.`)}).catch(e=>alert(`Error deleting submission: `+e.message))},x.onclick=async()=>{let t=r.dataset.submissionId,n=b.files[0];if(!n)return alert(`Please select an image first.`);if(n.type.startsWith(`video/`)&&n.size>25*1024*1024){alert(`Video must be 25 MB or smaller.`);return}if(n.type.startsWith(`image/`)&&n.size>8*1024*1024){alert(`Image must be 8 MB or smaller.`);return}let i=new FormData;if(n.type.startsWith(`video/`)){try{let e=await T(n);if(isFinite(e)&&e>10){alert(`Video must be 10 seconds or shorter.`);return}}catch{alert(`Unable to read video metadata. Please try another file.`);return}i.append(`video`,n)}else i.append(`photo`,n);o(`/quests/submission/${t}/photo`,{method:`PUT`,body:i}).then(({json:t})=>{if(!t.success)throw Error(t.message||`Upload failed`);t.video_url?(e(`#submissionImage`).hidden=!0,e(`#submissionVideo`).hidden=!1,e(`#submissionVideoSource`).src=t.video_url,e(`#submissionVideo`).load()):(e(`#submissionVideo`).hidden=!0,e(`#submissionImage`).hidden=!1,e(`#submissionImage`).src=t.image_url),S.click()}).catch(e=>alert(e.message))};function T(e){return new Promise((t,n)=>{try{let r=URL.createObjectURL(e),i=document.createElement(`video`);i.preload=`metadata`,i.onloadedmetadata=()=>{URL.revokeObjectURL(r),t(i.duration||0)},i.onerror=()=>{URL.revokeObjectURL(r),n(Error(`metadata error`))},i.src=r}catch(e){n(e)}})}let E=e(`#submissionReplyEdit`);E&&(E.hidden=g);let D=e(`#postReplyBtn`);D&&(D.hidden=g);let O=e(`#ownerNotice`);O&&(O.hidden=!g);let k=e(`#submissionRepliesContainer`);k&&(g?k.hidden=!0:k.hidden=!1);let A={img:e(`#submissionImage`),video:e(`#submissionVideo`),videoSource:e(`#submissionVideoSource`),imgOverlay:e(`#submitterProfileImageOverlay`),commentRead:e(`#submissionComment`),commentEdit:e(`#submissionCommentEdit`),readBox:e(`#commentReadButtons`),editBox:e(`#commentEditButtons`),editBtn:e(`#editCommentBtn`),profileImg:e(`#submitterProfileImage`),profileImgOverlay:e(`#submitterProfileImageOverlay`),profileCap:e(`#submitterProfileCaption`),profileLink:e(`#submitterProfileLink`),social:{tw:e(`#twitterLink`),fb:e(`#facebookLink`),ig:e(`#instagramLink`)}},j=e(`#submissionLikeBtn`),M=e(`#submissionLikeCount`);M&&(M.textContent=Number.isInteger(n.like_count)?n.like_count:0),j&&(j.classList.toggle(`active`,!!n.liked_by_current_user),X&&(j.style.display=`none`)),A.profileImg.src=n.user_profile_picture||l,A.profileImgOverlay.src=A.profileImg.src,A.profileCap.textContent=n.user_display_name||n.user_username||`—`,X?(A.profileLink.onclick=null,A.profileImg.onclick=null,A.profileCap.onclick=null,A.imgOverlay&&A.imgOverlay.parentElement&&(A.imgOverlay.parentElement.onclick=null)):(A.profileLink.onclick=e=>{e.preventDefault(),d(n.user_id)},A.profileImg.onclick=A.profileLink.onclick,A.profileCap.onclick=A.profileLink.onclick,A.imgOverlay.parentElement.onclick=A.profileLink.onclick);let N=l;if(n.video_url?(A.img.hidden=!0,A.video.hidden=!1,A.videoSource.src=n.video_url,A.video.load(),A.video.onloadeddata=()=>f(!1)):(A.video.hidden=!0,A.img.hidden=!1,A.img.src=n.url||N,A.img.complete?f(!1):(A.img.onload=()=>f(!1),A.img.onerror=()=>f(!1))),A.commentRead.textContent=n.comment||`No comment provided.`,[`tw`,`fb`,`ig`].forEach(e=>{let t=e===`tw`?`twitter_url`:e===`fb`?`fb_url`:`instagram_url`;try{new URL(n[t]),A.social[e].href=n[t],A.social[e].style.display=`inline-block`}catch{A.social[e].style.display=`none`}}),X){A.editBtn.hidden=!0,A.readBox.hidden=!0,A.commentEdit.hidden=!0,A.editBox.hidden=!0;let t=e(`#submissionRepliesContainer`);t&&(t.style.display=`none`)}else g?(A.editBtn.hidden=!1,A.readBox.hidden=!1):A.editBtn.hidden=A.readBox.hidden=A.commentEdit.hidden=A.editBox.hidden=!0;let P=Array.isArray(J)&&J.length>0&&Y>=0;a&&s&&(P?(a.style.display=`inline-flex`,s.style.display=`inline-flex`):(a.style.display=`none`,s.style.display=`none`)),h(),p(),t(`submissionDetailModal`)},e(`#editCommentBtn`).addEventListener(`click`,()=>{e(`#submissionCommentEdit`).value=e(`#submissionComment`).textContent.trim(),m(!0)}),e(`#saveCommentBtn`).addEventListener(`click`,()=>{let t=e(`#submissionDetailModal`).dataset.submissionId;o(`/quests/submission/${t}/comment`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({comment:e(`#submissionCommentEdit`).value.trim()})}).then(({json:t})=>{if(!t.success)throw Error(t.message||`Save failed`);e(`#submissionComment`).textContent=t.comment||`No comment provided.`,m(!1)}).catch(e=>alert(`Could not save comment: ${e.message}`))}),e(`#cancelCommentBtn`).addEventListener(`click`,()=>m(!1));function m(t){e(`#submissionComment`).hidden=t,e(`#commentReadButtons`).hidden=t,e(`#submissionCommentEdit`).hidden=!t,e(`#commentEditButtons`).hidden=!t}function h(){let t=e(`#submissionDetailModal`).dataset.submissionId;t&&(Q&&Q.abort(),Q=new AbortController,n(`/quests/submissions/${t}`,{signal:Q.signal}).then(({json:t})=>{let n=e(`#submissionLikeCount`),r=e(`#submissionLikeBtn`);n&&(n.textContent=t.like_count||0),r&&r.classList.toggle(`active`,t.liked_by_current_user),Array.isArray(J)&&Y>=0&&(J[Y].like_count=t.like_count,J[Y].liked_by_current_user=t.liked_by_current_user)}).catch(e=>{e.name!==`AbortError`&&console.error(e)}),X||($&&$.abort(),$=new AbortController,n(`/quests/submission/${t}/replies`,{signal:$.signal}).then(({json:t})=>{let n=e(`#submissionRepliesList`);if(!n)return;n.innerHTML=``,t.replies.forEach(e=>{let t=document.createElement(`div`);t.className=`reply mb-1`;let r=document.createElement(`a`);r.href=`#`,r.className=`reply-user-link`,r.dataset.userId=e.user_id;let i=document.createElement(`strong`);i.textContent=e.user_display,r.appendChild(i),t.appendChild(r),t.appendChild(document.createTextNode(`: ${e.content}`)),r.addEventListener(`click`,t=>{t.preventDefault(),d(e.user_id)}),n.appendChild(t)});let i=e(`#submissionReplyEdit`),a=e(`#postReplyBtn`);i&&a&&(t.replies.length>=10?(i.disabled=!0,a.disabled=!0,r&&(r.style.display=`block`)):(i.disabled=!1,a.disabled=!1,r&&(r.style.display=`none`)))}).catch(e=>{e.name!==`AbortError`&&console.error(e)})))}let g=e(`#submissionLikeBtn`);g&&g.addEventListener(`click`,()=>{let t=J[Y]?.id||e(`#submissionDetailModal`).dataset.submissionId;if(!t){alert(`Like failed`);return}let n=g.classList.contains(`active`);o(`/quests/submission/${t}/like`,{method:n?`DELETE`:`POST`,headers:{"Content-Type":`application/json`}}).then(({json:t})=>{if(!t.success)throw Error(t.message||`Like failed`);let n=e(`#submissionLikeCount`);n&&(n.textContent=t.like_count),g.classList.toggle(`active`,t.liked),Array.isArray(J)&&Y>=0&&(J[Y].like_count=t.like_count,J[Y].liked_by_current_user=t.liked)}).catch(e=>alert(e.message))});let _=e(`#postReplyBtn`);_&&_.addEventListener(`click`,()=>{if(X)return;let t=e(`#submissionDetailModal`).dataset.submissionId,n=e(`#submissionReplyEdit`);if(!n)return;let r=n.value.trim();!t||!r||o(`/quests/submission/${t}/replies`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({content:r})}).then(({status:t,json:r})=>{if(!r.success){if(r.message===`Reply limit of 10 reached`){v();return}if(t===409&&r.message===`Duplicate reply`)return alert(`You have already posted that exact reply.`);throw Error(r.message||`Error`)}let i=e(`#submissionRepliesList`),a=document.createElement(`div`);a.className=`reply mb-1`;let o=document.createElement(`strong`);o.textContent=r.reply.user_display,a.appendChild(o),a.appendChild(document.createTextNode(`: ${r.reply.content}`)),i.insertBefore(a,i.firstChild),n.value=``,i.children.length>=10&&v()}).catch(e=>alert(e.message))});function v(){let t=e(`#submissionReplyEdit`),n=e(`#postReplyBtn`);t&&(t.disabled=!0),n&&(n.disabled=!0),r&&(r.style.display=`block`)}a&&a.addEventListener(`click`,()=>{if(!Array.isArray(J)||Y<=0)return;let e=Y-1,t=J[e];t&&q({...t,read_only:X,album_items:J,album_index:e})}),s&&s.addEventListener(`click`,()=>{if(!Array.isArray(J)||Y>=J.length-1)return;let e=Y+1,t=J[e];t&&q({...t,read_only:X,album_items:J,album_index:e})})});export{v as n,d as r,q as t};