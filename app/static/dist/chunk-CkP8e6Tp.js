import{a as e,d as t,g as n,i as r,l as i,n as a,o,p as s,r as c,s as l,t as u}from"./chunk-D0-cRXV1.js";var d=Object.defineProperty,f=(e,t)=>{let n={};for(var r in e)d(n,r,{get:e[r],enumerable:!0});return t||d(n,Symbol.toStringTag,{value:`Module`}),n};function p(e){let r=document.getElementById(`game_IdHolder`),i=r?r.getAttribute(`data-game-id`):null,a=i&&!isNaN(parseInt(i,10))&&i!==`0`?`?game_id=${i}`:``;fetch(`/profile/${e}${a}`).then(e=>e.json()).then(r=>{if(!r.riding_preferences_choices){n.error(`Riding preferences choices missing.`);return}let i=document.getElementById(`userProfileDetails`);if(!i){n.error(`Profile details containers not found`);return}let a=r.current_user_id===r.user.id;i.innerHTML=`
          <!-- XS: native select dropdown -->
          <div class="d-block d-sm-none mb-3">
            <select id="profileTabSelect" class="form-select">
              <option value="profile" selected>Profile</option>
              <option value="bike">Bike</option>
              ${r.has_badges?`<option value="badges-earned">Badges Earned</option>`:``}
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
            ${r.has_badges?`
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
                ${a?`
                  <div id="profileViewMode">
                    ${r.user.profile_picture?`
                      <div class="profile-picture-container position-relative mx-auto mb-3">
                        <img src="/static/${r.user.profile_picture}"
                            class="profile-picture rounded-circle shadow-lg border border-white border-4"
                            alt="Profile Picture">
                      </div>`:``}
                    <p><strong>Display Name:</strong> ${r.user.display_name||``}</p>
                    <p><strong>Age Group:</strong> ${r.user.age_group||``}</p>
                    <p><strong>Timezone:</strong> ${r.user.timezone||``}</p>
                    <p><strong>Interests:</strong> ${r.user.interests||``}</p>
                    <p><strong>Riding Preferences:</strong> ${r.user.riding_preferences.join(`, `)}</p>
                    <p><strong>Ride Description:</strong> ${r.user.ride_description||``}</p>
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
                                value="${r.user.display_name||``}" required>
                        <div class="invalid-feedback">Display Name is required.</div>
                      </div>
                      <div class="form-group mb-3">
                        <label for="ageGroup">Age Group:</label>
                        <select class="form-select" id="ageGroup" name="age_group">
                          <option value="teen" ${r.user.age_group===`teen`?`selected`:``}>Teen</option>
                          <option value="adult" ${r.user.age_group===`adult`?`selected`:``}>Adult</option>
                          <option value="senior" ${r.user.age_group===`senior`?`selected`:``}>Senior</option>
                        </select>
                      </div>
                      <div class="form-group mb-3">
                        <label for="timezone">Timezone:</label>
                        <select class="form-select" id="timezone" name="timezone">
                          ${r.timezone_choices.map(e=>`
                            <option value="${e}" ${r.user.timezone===e?`selected`:``}>${e}</option>
                          `).join(``)}
                        </select>
                      </div>
                      <div class="form-group mb-3">
                        <label for="interests">Interests:</label>
                        <textarea class="form-control" id="interests" name="interests" rows="3"
                                  placeholder="Describe your interests...">${r.user.interests||``}</textarea>
                      </div>
                      <div class="form-group mb-3">
                        <label><b>Please specify your riding preferences:</b></label>
                        <div id="ridingPreferences">
                          ${r.riding_preferences_choices.map((e,t)=>`
                            <div class="form-check mb-2">
                              <input class="form-check-input" type="checkbox"
                                      id="ridingPref-${t}" name="riding_preferences"
                                      value="${e[0]}"
                                      ${r.user.riding_preferences.includes(e[0])?`checked`:``}>
                              <label class="form-check-label" for="ridingPref-${t}">${e[1]}</label>
                            </div>
                          `).join(``)}
                        </div>
                      </div>
                      <div class="form-group mb-3">
                        <label for="rideDescription">Describe the type of riding you like to do:</label>
                        <textarea class="form-control" id="rideDescription" name="ride_description" rows="3">${r.user.ride_description||``}</textarea>
                      </div>
                      <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="uploadToSocials" name="upload_to_socials"
                                ${r.user.upload_to_socials?`checked`:``}>
                        <label class="form-check-label" for="uploadToSocials">Cross post to game's social media?</label>
                      </div>
                      <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="uploadToMastodon" name="upload_to_mastodon"
                                ${r.user.upload_to_mastodon?`checked`:``}>
                        <label class="form-check-label" for="uploadToMastodon">Cross post to your federation server?</label>
                      </div>
                      ${r.user.is_admin?``:`
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
                    ${r.user.profile_picture?`
                    <div class="profile-picture-container position-relative mx-auto mb-3">
                      <img src="/static/${r.user.profile_picture}"
                          class="profile-picture rounded-circle shadow-lg border border-white border-4"
                          alt="Profile Picture">
                    </div>`:``}
                    <p><strong>Display Name:</strong> ${r.user.display_name||``}</p>
                    <p><strong>Age Group:</strong> ${r.user.age_group||``}</p>
                    <p><strong>Timezone:</strong> ${r.user.timezone||``}</p>
                    <p><strong>Interests:</strong> ${r.user.interests||``}</p>
                    <p><strong>Riding Preferences:</strong> ${r.user.riding_preferences.join(`, `)}</p>
                    <p><strong>Ride Description:</strong> ${r.user.ride_description||``}</p>
                  </div>
                `}
              </section>
            </div>

            <!-- 2) BIKE pane -->
            <div class="tab-pane fade" id="bike" role="tabpanel" aria-labelledby="bike-tab">
              <section class="bike mb-4">
                <h2 class="h2">Bike Details</h2>
                ${a?`
                  <form id="editBikeForm" class="needs-validation" novalidate>
                    <div class="form-group mb-3">
                      <label for="bikePicture">Upload Your Bicycle Picture:</label>
                      <input type="file" class="form-control" id="bikePicture" name="bike_picture" accept="image/*">
                    </div>
                    ${r.user.bike_picture?`
                      <div class="form-group mb-3">
                        <label>Current Bicycle Picture:</label>
                        <img src="/static/${r.user.bike_picture}" class="img-fluid rounded shadow-sm" alt="Bicycle Picture">
                      </div>`:``}
                    <div class="form-group mb-3">
                      <label for="bikeDescription">Bicycle Description:</label>
                      <textarea class="form-control" id="bikeDescription" name="bike_description" rows="3">${r.user.bike_description||``}</textarea>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button class="btn btn-success" id="saveBikeBtn">
                        <i class="bi bi-save me-2"></i>Save Bike Details
                      </button>
                    </div>
                  </form>`:`
                  <p><strong>Bicycle Description:</strong> ${r.user.bike_description||``}</p>`}
              </section>
            </div>

            ${r.has_badges?`
            <!-- 3) BADGES EARNED pane -->
            <div class="tab-pane fade" id="badges-earned" role="tabpanel" aria-labelledby="badges-earned-tab">
              <section class="badges-earned mb-4">
                <h2 class="h2">Badges Earned</h2>
                <div class="badge-grid">
                  ${r.user.badges&&r.user.badges.length?r.user.badges.map(e=>`
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
                  ${r.participated_games&&r.participated_games.length?r.participated_games.map(e=>`
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
                  ${r.quest_submissions&&r.quest_submissions.length?r.quest_submissions.map(e=>`
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
                        ${a?`<button class="btn btn-danger btn-sm mt-2" data-delete-submission="${e.id}">Delete</button>`:``}
                      </div>
                    `).join(``):`<p class="text-muted">No quest submissions yet.</p>`}
                </div>
              </section>
            </div>

          </div> <!-- /.tab-content -->
        </div> <!-- /.row -->
      `;let o=document.getElementById(`userProfileModalLabel`);o.textContent=`${r.user.display_name||r.user.username}'s Profile`;let s=document.getElementById(`followBtn`);s&&(s.style.display=``);let l=document.getElementById(`followerCount`),u=r.user.follower_count;function d(){l&&(l.textContent=`${u} follower${u===1?``:`s`}`)}if(d(),!a&&s){s&&(s.style.display=``,s.classList.remove(`d-none`));let e=r.current_user_following;function t(){e?(s.textContent=`Following`,s.classList.remove(`btn-primary`),s.classList.add(`btn-outline-primary`)):(s.textContent=`Follow`,s.classList.remove(`btn-outline-primary`),s.classList.add(`btn-primary`))}t(),s.onclick=async()=>{let i=e?`unfollow`:`follow`,{status:a}=await c(`/profile/${r.user.username}/${i}`,{method:`POST`,headers:{"Content-Type":`application/json`}});if(a!==200){n.error(`Follow toggle failed`);return}e=!e,u+=e?1:-1,t(),d()}}else{let e=document.getElementById(`followBtn`);e&&(e.style.display=`none`)}t(`userProfileModal`);let f=document.getElementById(`editProfileBtn`);f&&f.addEventListener(`click`,m);let p=document.getElementById(`saveProfileBtn`);p&&p.addEventListener(`click`,()=>g(e));let b=document.getElementById(`cancelProfileBtn`);b&&b.addEventListener(`click`,t=>{t.preventDefault(),h(e)});let x=document.getElementById(`updatePasswordBtn`);x&&x.addEventListener(`click`,()=>{window.location.href=`/auth/update_password`});let S=document.getElementById(`saveBikeBtn`);S&&S.addEventListener(`click`,()=>_(e)),document.querySelectorAll(`[data-delete-submission]`).forEach(e=>{e.addEventListener(`click`,()=>{v(e.getAttribute(`data-delete-submission`),`profileSubmissions`,r.user.id)})});let C=document.getElementById(`deleteAccountForm`);C&&C.addEventListener(`submit`,e=>{e.preventDefault(),y()});let w=document.getElementById(`profileTabSelect`);w&&(w.addEventListener(`change`,e=>{let t=e.target.value,n=document.querySelector(`#profileTabs a[href="#${t}"]`);n&&new bootstrap.Tab(n).show()}),document.querySelectorAll(`#profileTabs a[data-bs-toggle="tab"]`).forEach(e=>{e.addEventListener(`shown.bs.tab`,e=>{w.value=e.target.getAttribute(`href`).slice(1)})}))}).catch(e=>{n.error(`Failed to load profile:`,e),alert(`Could not load user profile. Please try again.`)})}document.querySelectorAll(`[data-floating-ui-tooltip]`).forEach(e=>{tippy(e,{content:e.getAttribute(`data-floating-ui-tooltip`),placement:`top`,animation:`scale-subtle`})}),document.querySelectorAll(`.needs-validation`).forEach(e=>{e.addEventListener(`submit`,t=>{e.checkValidity()||(t.preventDefault(),t.stopPropagation()),e.classList.add(`was-validated`)},!1)});function m(){let e=document.getElementById(`profileViewMode`),t=document.getElementById(`profileEditMode`);if(!e||!t){n.error(`Profile edit mode elements missing`);return}e.classList.toggle(`d-none`),t.classList.toggle(`d-none`)}function h(e){p(e)}function g(e){let t=document.getElementById(`editProfileForm`);if(!t){n.error(`Edit profile form not found`);return}let r=new FormData(t),i=document.getElementById(`profilePictureInput`);i.files.length>0&&r.append(`profile_picture`,i.files[0]);let a=[];t.querySelectorAll(`input[name="riding_preferences"]:checked`).forEach(e=>{a.push(e.value)}),r.delete(`riding_preferences`),a.forEach(e=>{r.append(`riding_preferences`,e)}),c(`/profile/${e}/edit`,{method:`POST`,body:r}).then(({json:t})=>{if(t.error){let e=`Error: ${t.error}`;if(t.details){let n=[];Object.values(t.details).forEach(e=>{n.push(e.join(`, `))}),n.length&&(e+=` - ${n.join(`; `)}`)}alert(e)}else alert(`Profile updated successfully.`),p(e)}).catch(e=>{n.error(`Error updating profile:`,e),alert(`Failed to update profile. Please try again.`)})}function _(e){let t=document.getElementById(`editBikeForm`);if(!t){n.error(`Edit bike form not found`);return}let r=new FormData(t),i=document.getElementById(`bikePicture`);i.files.length>0&&r.append(`bike_picture`,i.files[0]),c(`/profile/${e}/edit-bike`,{method:`POST`,body:r}).then(({json:t})=>{t.error?alert(`Error: ${t.error}`):(alert(`Bike details updated successfully.`),p(e))}).catch(e=>{n.error(`Error updating bike details:`,e),alert(`Failed to update bike details. Please try again.`)})}function v(e,t,r){c(`/quests/quest/delete_submission/${e}`,{method:`POST`}).then(({json:e})=>{if(e.success)alert(`Submission deleted successfully.`),t===`profileSubmissions`&&p(r);else throw Error(e.message)}).catch(e=>{n.error(`Error deleting submission:`,e),alert(`Error during deletion: `+e.message)})}function y(){confirm(`Are you sure you want to delete your account? This action cannot be undone.`)&&c(`/auth/delete_account`,{method:`POST`,headers:{"Content-Type":`application/json`}}).then(()=>{window.location.href=`/`}).catch(e=>{n.error(`Error deleting account:`,e),alert(`Failed to delete account. Please try again.`)})}document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-user-profile]`);if(!t)return;let n=document.body.dataset.userId;if(!n||n===`none`)return;e.preventDefault();let r=t.getAttribute(`data-user-profile`);r&&p(r)});var b=f({openQuestDetailModal:()=>T,refreshQuestDetailModal:()=>E});function x(e){let t=document.querySelector(`meta[name="${e}"]`);return t?t.content:``}var S=Number(x(`current-user-id`)||0),C=e(),w=document.querySelector(`meta[name="placeholder-image"]`).getAttribute(`content`);function T(e){s(),r(`/quests/detail/${encodeURIComponent(e)}/user_completion`).then(({json:r})=>{let{quest:i,userCompletion:a,canVerify:o,nextEligibleTime:s}=r;if(!O(i,a.completions,o,e,s)){n.error(`populateQuestDetails – required element missing`);return}k(i,a.completions,s,o),t(`questDetailModal`),D(),G(e)}).catch(e=>{n.error(`Error opening quest detail modal:`,e),alert(`Sign in to view quest details.`)})}function E(e){r(`/quests/detail/${encodeURIComponent(e)}/user_completion`).then(({json:t})=>{let{quest:r,userCompletion:i,canVerify:a,nextEligibleTime:o}=t;if(!O(r,i.completions,a,e,o)){n.error(`populateQuestDetails - required element missing`);return}k(r,i.completions,o,a),D(),G(e)}).catch(e=>{n.error(`Failed to refresh quest detail modal:`,e)})}function D(){let e=document.querySelectorAll(`img.lazyload`),t=new IntersectionObserver((e,t)=>{e.forEach(e=>{if(e.isIntersecting){let n=e.target;n.src=n.getAttribute(`data-src`),n.classList.remove(`lazyload`),t.unobserve(n)}})});e.forEach(e=>{t.observe(e)})}function O(e,t,r,i,a){let o=t>=e.completion_limit?` - complete`:``,s={modalQuestTitle:document.getElementById(`modalQuestTitle`),modalQuestDescription:document.getElementById(`modalQuestDescription`),modalQuestTips:document.getElementById(`modalQuestTips`),modalQuestPoints:document.getElementById(`modalQuestPoints`),modalQuestCompletionLimit:document.getElementById(`modalQuestCompletionLimit`),modalQuestBadgeAwarded:document.getElementById(`modalQuestBadgeAwarded`),modalQuestCategory:document.getElementById(`modalQuestCategory`),modalQuestVerificationType:document.getElementById(`modalQuestVerificationType`),modalQuestBadgeImage:document.getElementById(`modalQuestBadgeImage`),modalQuestCompletions:document.getElementById(`modalQuestCompletions`),modalCountdown:document.getElementById(`modalCountdown`)};for(let e in s)if(!s[e])return n.error(`Error: Missing element ${e}`),!1;let c={badge:s.modalQuestBadgeImage?.closest(`.quest-detail-item`),badgeAwarded:s.modalQuestBadgeAwarded?.closest(`.quest-detail-item`),category:s.modalQuestCategory?.closest(`.quest-detail-item`)};for(let e in c)if(!c[e])return n.error(`Error: Missing card element ${e}`),!1;s.modalQuestTitle.innerText=`${e.title}${o}`,s.modalQuestDescription.textContent=e.description,s.modalQuestTips.textContent=e.tips||`No tips available`,s.modalQuestPoints.innerText=`${e.points}`,s.modalQuestCategory.innerText=e.category||`No category set`;let l=e.completion_limit>1?`${e.completion_limit} times`:`${e.completion_limit} time`;s.modalQuestCompletionLimit.innerText=`${l} ${e.frequency}`;let u=e.badge_awarded>1?`${e.badge_awarded} times`:`${e.badge_awarded} time`;switch(e.badge_awarded==null?s.modalQuestBadgeAwarded.innerText=`No badge awarded`:s.modalQuestBadgeAwarded.innerText=`After ${u}`,e.verification_type){case`photo_comment`:s.modalQuestVerificationType.innerText=`Must upload a photo to earn points! Comment optional.`;break;case`photo`:s.modalQuestVerificationType.innerText=`Must upload a photo to earn points!`;break;case`comment`:s.modalQuestVerificationType.innerText=`Must upload a comment to earn points!`;break;case`qr_code`:s.modalQuestVerificationType.innerText=`Find the QR code and post a photo to earn points!`;break;default:s.modalQuestVerificationType.innerText=`Not specified`;break}let d=e.badge&&e.badge.image?`/static/images/badge_images/${e.badge.image}`:w;s.modalQuestBadgeImage.setAttribute(`data-src`,d),s.modalQuestBadgeImage.src=w,s.modalQuestBadgeImage.classList.add(`lazyload`),s.modalQuestBadgeImage.alt=e.badge&&e.badge.name?`Badge: ${e.badge.name}`:`Default Badge`,e.badge_option===`none`?(c.badge.classList.add(`hidden`),c.badgeAwarded.classList.add(`hidden`),c.category.classList.add(`hidden`)):(c.badge.classList.remove(`hidden`),c.badgeAwarded.classList.remove(`hidden`),c.category.classList.remove(`hidden`)),s.modalQuestCompletions.innerText=`Total Completions: ${t}`;let f=a&&new Date(a);return!r&&f&&f>new Date?(s.modalCountdown.innerText=`Next eligible time: ${f.toLocaleString()}`,s.modalCountdown.style.color=`red`):(s.modalCountdown.innerText=`You are currently eligible to verify!`,s.modalCountdown.style.color=`green`),M(i,r,e.verification_type),!0}function k(e,t,r,i){let a=document.querySelector(`.user-quest-data`);if(!a){n.error(`Parent element .user-quest-data not found`);return}[{id:`modalQuestCompletions`,value:`${t||0}`},{id:`modalCountdown`,value:``}].forEach(e=>{let t=document.getElementById(e.id);t||(t=document.createElement(`p`),t.id=e.id,a.appendChild(t)),t.innerText=e.value}),A(document.getElementById(`modalCountdown`),r,i)}function A(e,t,n){if(!n&&t){let n=new Date(t),r=new Date;n>r?e.innerText=`Next eligible time: ${j(n-r)}`:e.innerText=`You are currently eligible to verify!`}else e.innerText=`You are currently eligible to verify!`}function j(e){let t=Math.floor(e/1e3%60),n=Math.floor(e/(1e3*60)%60),r=Math.floor(e/(1e3*60*60)%24);return`${Math.floor(e/(1e3*60*60*24))}d ${r}h ${n}m ${t}s`}function M(e,t,r){let i=document.querySelector(`.user-quest-data`);if(!i){n.error(`Parent element .user-quest-data not found`);return}if(i.innerHTML=``,t){let t=document.createElement(`div`);t.id=`verifyQuestForm-${e}`,t.className=`verify-quest-form`,t.style.display=`block`;let n=N(r.trim().toLowerCase(),e);t.appendChild(n),i.appendChild(t),L(e)}else{let e=document.createElement(`p`);e.className=`epic-message text-success`,e.textContent=`Thanks for completing the quest.`,i.appendChild(e)}}function N(e,t){let n=document.createElement(`form`);n.enctype=`multipart/form-data`,n.className=`epic-form`,n.method=`post`,n.action=`/quests/quest/${encodeURIComponent(t)}/submit`;let r=document.createElement(`input`);r.type=`hidden`,r.name=`csrf_token`,r.value=C,n.appendChild(r);let i=document.createElement(`h2`);switch(i.style.textAlign=`center`,i.textContent=`Verify Your Quest`,n.appendChild(i),e){case`photo`:n.appendChild(P(`image`,`Upload a Photo`,`image/*`,!0)),n.appendChild(I());break;case`comment`:n.appendChild(F(`verificationComment`,`Enter a Comment`,`Enter a comment...`,!0)),n.appendChild(I());break;case`photo_comment`:n.appendChild(P(`image`,`Upload a Photo`,`image/*`,!0)),n.appendChild(F(`verificationComment`,`Enter a Comment (optional)`,`Enter a comment...`,!1)),n.appendChild(I());break;case`video`:n.appendChild(P(`video`,`Upload a Video`,`video/*`,!0)),n.appendChild(F(`verificationComment`,`Add a Comment (optional)`,`Enter an optional comment...`,!1)),n.appendChild(I());break;case`qr_code`:{let e=document.createElement(`p`);e.className=`epic-message`,e.textContent=`Find and scan the QR code. No submission required here.`,n.appendChild(e);break}case`pause`:{let e=document.createElement(`p`);e.className=`epic-message`,e.textContent=`Quest is currently paused.`,n.appendChild(e);break}default:{let e=document.createElement(`p`);e.className=`epic-message`,e.textContent=`Submission requirements are not set correctly.`,n.appendChild(e)}}return n}function P(e,t,n,r){let i=document.createElement(`div`);i.className=`form-group`;let a=document.createElement(`label`);a.htmlFor=e,a.className=`epic-label`,a.textContent=t,i.appendChild(a);let o=document.createElement(`input`);return o.type=`file`,o.id=e,o.name=e,o.className=`epic-input`,o.accept=n,r&&(o.required=!0),i.appendChild(o),i}function F(e,t,n,r){let i=document.createElement(`div`);i.className=`form-group`;let a=document.createElement(`label`);a.htmlFor=e,a.className=`epic-label`,a.textContent=t,i.appendChild(a);let o=document.createElement(`textarea`);return o.id=e,o.name=e,o.className=`epic-textarea`,o.placeholder=n,r&&(o.required=!0),i.appendChild(o),i}function I(){let e=document.createElement(`div`);e.className=`form-group`;let t=document.createElement(`button`);return t.type=`submit`,t.textContent=`Submit Verification`,e.appendChild(t),e}function L(e){let t=document.getElementById(`verifyQuestForm-${e}`);if(!t){n.error(`Form container not found for quest ID:`,e);return}let r=t.querySelector(`form`);if(!r){n.error(`Form element missing for quest ID:`,e);return}r.addEventListener(`submit`,function(t){U(t,e)})}function R(e,t){if(!e)return;let n=o(t);n?(e.href=n,e.rel=`noopener noreferrer`,e.style.display=`inline`):(e.removeAttribute(`href`),e.style.display=`none`)}function z(e){if(typeof e!=`number`)return;let t=document.getElementById(`total-points`);if(!t)return;let n=t.querySelector(`.points-emphasized`);n?n.textContent=e:t.textContent=`Your Carbon Reduction Points: ${e}`}function B(e,t,n){let r=document.querySelector(`#questTableBody tr[data-quest-id="${e}"]`);if(!r)return;let i=r.querySelectorAll(`.quest-stats-cell`);i.length>=2&&(i[0].innerText=t,i[1].innerText=n)}function V(e){R(document.getElementById(`twitterLink`),e.twitter_url),R(document.getElementById(`facebookLink`),e.fb_url),R(document.getElementById(`instagramLink`),e.instagram_url)}var H=!1;async function U(e,t){if(e.preventDefault(),H)return;H=!0;let r=e.target.querySelector(`[type="submit"]`);r&&(r.disabled=!0);try{a(`Uploading...`);let n=e.target.querySelector(`input[type="file"]`),r=n?n.files[0]:null;if(r&&r.type.startsWith(`video/`)&&r.size>25*1024*1024){alert(`Video must be 25 MB or smaller.`);return}if(r&&r.type.startsWith(`image/`)&&r.size>8*1024*1024){alert(`Image must be 8 MB or smaller.`);return}if(r&&r.type.startsWith(`video/`))try{let e=await W(r);if(isFinite(e)&&e>10){alert(`Video must be 10 seconds or shorter.`);return}}catch{alert(`Unable to read video metadata. Please try another file.`);return}let i=new FormData(e.target);i.append(`user_id`,S);let{status:o,json:s}=await c(`/quests/quest/${encodeURIComponent(t)}/submit`,{method:`POST`,body:i});if(o!==200)throw o===403&&s.message===`This quest cannot be completed outside of the game dates`?Error(`The game has ended and you can no longer submit quests. Join a new game in the game dropdown menu.`):Error(s.message||`Server responded with status ${o}`);if(!s.success||!s.success)throw Error(s.message);z(s.total_points),V(s),B(t,s.new_completion_count,s.total_completion_count),E(t),e.target.reset()}catch(e){n.error(`Submission error:`,e),alert(`Error during submission: ${e.message}`)}finally{H=!1,r&&(r.disabled=!1),u()}}function W(e){return new Promise((t,n)=>{try{let r=URL.createObjectURL(e),i=document.createElement(`video`);i.preload=`metadata`,i.onloadedmetadata=()=>{URL.revokeObjectURL(r),t(i.duration||0)},i.onerror=()=>{URL.revokeObjectURL(r),n(Error(`metadata error`))},i.src=r}catch(e){n(e)}})}async function G(e){let t=encodeURIComponent(e);try{let{json:n}=await r(`/quests/quest/${t}/submissions`),i=document.getElementById(`twitterLink`),a=document.getElementById(`facebookLink`),o=document.getElementById(`instagramLink`);if(n&&n.length){let e=n[0],t=document.getElementById(`submissionImage`),r=document.getElementById(`submissionVideo`),i=document.getElementById(`submissionVideoSource`),a=document.getElementById(`submissionComment`),o=document.getElementById(`submitterProfileLink`),s=document.getElementById(`submitterProfileImage`),c=document.getElementById(`submitterProfileCaption`),u=l(e.image_url)||w,d=l(e.video_url);d?(t.hidden=!0,r.hidden=!1,i.src=d,r.load()):(r.hidden=!0,t.hidden=!1,t.src=u),a.textContent=e.comment||`No comment provided.`,o&&o.tagName===`A`&&S?o.href=`/profile/${encodeURIComponent(e.user_id)}`:o&&o.removeAttribute(`href`),s.src=l(e.user_profile_picture)||w,c.textContent=e.user_display_name||e.user_username||`User ${e.user_id}`,V(e)}else [i,a,o].forEach(e=>{e&&(e.style.display=`none`)});K(n.slice().reverse().map(t=>({id:t.id,url:t.image_url||(t.video_url?null:w),video_url:t.video_url,alt:`Submission Image`,comment:t.comment,user_id:t.user_id,user_display_name:t.user_display_name,user_username:t.user_username,user_profile_picture:t.user_profile_picture,twitter_url:t.twitter_url,fb_url:t.fb_url,instagram_url:t.instagram_url,quest_id:e})))}catch(e){n.error(`Failed to fetch submissions:`,e),alert(`Could not load submissions. Please try again.`)}}function K(e){let t=document.getElementById(`submissionBoard`);if(!t){n.error(`submissionBoard element not found`);return}t.innerHTML=``;let r=l(document.getElementById(`questDetailModal`)?.getAttribute(`data-placeholder-url`)||w)||w,i=e=>e.startsWith(`/static/`),a=e=>e.replace(/^\/static\//,``),o=window.innerWidth<=480?70:100,s=Math.round(o*(window.devicePixelRatio||2));e.forEach(e=>{let n,c=l(e.video_url);if(c)n=document.createElement(`video`),n.src=c,n.preload=`metadata`,n.muted=!0,n.playsInline=!0,n.style.objectFit=`cover`;else{n=document.createElement(`img`);let t=l(e.url)||r,o=i(t)?`/resize_image?path=${encodeURIComponent(a(t))}&width=${s}`:t;n.src=w,n.setAttribute(`data-src`,o),n.classList.add(`lazyload`),n.alt=e.alt||`Submission Image`}n.style.width=`${o}px`,n.style.height=`auto`,n.style.marginRight=`10px`,c||(n.onerror=()=>{i(r)?n.src=`/resize_image?path=${encodeURIComponent(a(r))}&width=${s}`:n.src=r}),n.onclick=()=>q(e),t.appendChild(n)}),D()}function ee(e){e.querySelectorAll(`span, img`).forEach(e=>{e.classList.toggle(`hidden`)})}document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-quest-detail]`);if(t){e.preventDefault(),T(t.getAttribute(`data-quest-detail`));return}let n=e.target.closest(`[data-toggle-content]`);n&&n.closest(`#questDetailModal`)&&(e.preventDefault(),ee(n))});var q,J=[],Y=-1,X=!1,Z=new Image,Q=null,$=null;document.addEventListener(`DOMContentLoaded`,()=>{let e=e=>document.querySelector(e);if(!e(`#submissionDetailModal`))return;let n=document.getElementById(`replyLimitMessage`),a=document.getElementById(`prevSubmissionBtn`),u=document.getElementById(`nextSubmissionBtn`),d=document.querySelector(`meta[name="placeholder-image"]`).getAttribute(`content`),f=()=>{let t=e(`#submissionImage`),n=e(`#submissionVideo`),r=e(`#submissionVideoSource`);t&&(t.onload=null,t.onerror=null,t.src=``),n&&r&&(n.onloadeddata=null,n.pause(),r.src=``,n.load()),Z.src=``},m=e=>{!a||!u||(e?(a.disabled=!0,u.disabled=!0):(a.disabled=Y<=0,u.disabled=Y>=J.length-1))},h=()=>{if(Z.src=``,!Array.isArray(J))return;let e=J[Y+1];if(!e||l(e.video_url))return;let t=l(e.url);t&&(Z.src=t)};q=function(n){let r=e(`#submissionDetailModal`);r.dataset.submissionId=n.id,r.dataset.questId=n.quest_id||``,X=!r.dataset.currentUserId||!!(n.read_only||n.readOnly),Array.isArray(n.album_items)&&(J=n.album_items,Y=Number.isInteger(n.album_index)?n.album_index:-1),f(),Q&&Q.abort(),$&&$.abort(),m(!0);let g=Number(r.dataset.currentUserId),v=Number(n.user_id)===g,y=r.dataset.isAdmin===`True`||r.dataset.isAdmin===`true`,b=e(`#editPhotoBtn`),x=e(`#photoEditControls`),S=e(`#submissionPhotoInput`),C=e(`#savePhotoBtn`),w=e(`#cancelPhotoBtn`),T=e(`#deleteSubmissionBtn`);b.hidden=!v||X,T.hidden=!(v||y),x.hidden=!0,b.onclick=()=>{x.hidden=!1,b.hidden=!0,S&&S.click()},w.onclick=()=>{S.value=``,x.hidden=!0,b.hidden=!1},T.onclick=()=>{if(!confirm(`Are you sure you want to delete this submission?`))return;let e=r.dataset.submissionId;c(`/quests/quest/delete_submission/${e}`,{method:`POST`}).then(({json:e})=>{if(!e.success)throw Error(e.message||`Delete failed`);i(`submissionDetailModal`),s(),r.dataset.questId&&E(r.dataset.questId),alert(`Submission deleted successfully.`)}).catch(e=>alert(`Error deleting submission: `+e.message))},C.onclick=async()=>{let t=r.dataset.submissionId,n=S.files[0];if(!n)return alert(`Please select an image first.`);if(n.type.startsWith(`video/`)&&n.size>25*1024*1024){alert(`Video must be 25 MB or smaller.`);return}if(n.type.startsWith(`image/`)&&n.size>8*1024*1024){alert(`Image must be 8 MB or smaller.`);return}let i=new FormData;if(n.type.startsWith(`video/`)){try{let e=await D(n);if(isFinite(e)&&e>10){alert(`Video must be 10 seconds or shorter.`);return}}catch{alert(`Unable to read video metadata. Please try another file.`);return}i.append(`video`,n)}else i.append(`photo`,n);c(`/quests/submission/${t}/photo`,{method:`PUT`,body:i}).then(({json:t})=>{if(!t.success)throw Error(t.message||`Upload failed`);let n=l(t.video_url),r=l(t.image_url)||d;n?(e(`#submissionImage`).hidden=!0,e(`#submissionVideo`).hidden=!1,e(`#submissionVideoSource`).src=n,e(`#submissionVideo`).load()):(e(`#submissionVideo`).hidden=!0,e(`#submissionImage`).hidden=!1,e(`#submissionImage`).src=r),w.click()}).catch(e=>alert(e.message))};function D(e){return new Promise((t,n)=>{try{let r=URL.createObjectURL(e),i=document.createElement(`video`);i.preload=`metadata`,i.onloadedmetadata=()=>{URL.revokeObjectURL(r),t(i.duration||0)},i.onerror=()=>{URL.revokeObjectURL(r),n(Error(`metadata error`))},i.src=r}catch(e){n(e)}})}let O=e(`#submissionReplyEdit`);O&&(O.hidden=v);let k=e(`#postReplyBtn`);k&&(k.hidden=v);let A=e(`#ownerNotice`);A&&(A.hidden=!v);let j=e(`#submissionRepliesContainer`);j&&(v?j.hidden=!0:j.hidden=!1);let M={img:e(`#submissionImage`),video:e(`#submissionVideo`),videoSource:e(`#submissionVideoSource`),imgOverlay:e(`#submitterProfileImageOverlay`),commentRead:e(`#submissionComment`),commentEdit:e(`#submissionCommentEdit`),readBox:e(`#commentReadButtons`),editBox:e(`#commentEditButtons`),editBtn:e(`#editCommentBtn`),profileImg:e(`#submitterProfileImage`),profileImgOverlay:e(`#submitterProfileImageOverlay`),profileCap:e(`#submitterProfileCaption`),profileLink:e(`#submitterProfileLink`),social:{tw:e(`#twitterLink`),fb:e(`#facebookLink`),ig:e(`#instagramLink`)}},N=e(`#submissionLikeBtn`),P=e(`#submissionLikeCount`);P&&(P.textContent=Number.isInteger(n.like_count)?n.like_count:0),N&&(N.classList.toggle(`active`,!!n.liked_by_current_user),X&&(N.style.display=`none`)),M.profileImg.src=l(n.user_profile_picture)||d,M.profileImgOverlay.src=M.profileImg.src,M.profileCap.textContent=n.user_display_name||n.user_username||`—`,X?(M.profileLink.onclick=null,M.profileImg.onclick=null,M.profileCap.onclick=null,M.imgOverlay&&M.imgOverlay.parentElement&&(M.imgOverlay.parentElement.onclick=null)):(M.profileLink.onclick=e=>{e.preventDefault(),p(n.user_id)},M.profileImg.onclick=M.profileLink.onclick,M.profileCap.onclick=M.profileLink.onclick,M.imgOverlay.parentElement.onclick=M.profileLink.onclick);let F=d,I=l(n.video_url),L=l(n.url)||F;if(I?(M.img.hidden=!0,M.video.hidden=!1,M.videoSource.src=I,M.video.load(),M.video.onloadeddata=()=>m(!1)):(M.video.hidden=!0,M.img.hidden=!1,M.img.src=L,M.img.complete?m(!1):(M.img.onload=()=>m(!1),M.img.onerror=()=>m(!1))),M.commentRead.textContent=n.comment||`No comment provided.`,[`tw`,`fb`,`ig`].forEach(e=>{let t=o(n[e===`tw`?`twitter_url`:e===`fb`?`fb_url`:`instagram_url`]);t?(M.social[e].href=t,M.social[e].rel=`noopener noreferrer`,M.social[e].style.display=`inline-block`):(M.social[e].removeAttribute(`href`),M.social[e].style.display=`none`)}),X){M.editBtn.hidden=!0,M.readBox.hidden=!0,M.commentEdit.hidden=!0,M.editBox.hidden=!0;let t=e(`#submissionRepliesContainer`);t&&(t.style.display=`none`)}else v?(M.editBtn.hidden=!1,M.readBox.hidden=!1):M.editBtn.hidden=M.readBox.hidden=M.commentEdit.hidden=M.editBox.hidden=!0;let R=Array.isArray(J)&&J.length>0&&Y>=0;a&&u&&(R?(a.style.display=`inline-flex`,u.style.display=`inline-flex`):(a.style.display=`none`,u.style.display=`none`)),_(),h(),t(`submissionDetailModal`)},e(`#editCommentBtn`).addEventListener(`click`,()=>{e(`#submissionCommentEdit`).value=e(`#submissionComment`).textContent.trim(),g(!0)}),e(`#saveCommentBtn`).addEventListener(`click`,()=>{let t=e(`#submissionDetailModal`).dataset.submissionId;c(`/quests/submission/${t}/comment`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({comment:e(`#submissionCommentEdit`).value.trim()})}).then(({json:t})=>{if(!t.success)throw Error(t.message||`Save failed`);e(`#submissionComment`).textContent=t.comment||`No comment provided.`,g(!1)}).catch(e=>alert(`Could not save comment: ${e.message}`))}),e(`#cancelCommentBtn`).addEventListener(`click`,()=>g(!1));function g(t){e(`#submissionComment`).hidden=t,e(`#commentReadButtons`).hidden=t,e(`#submissionCommentEdit`).hidden=!t,e(`#commentEditButtons`).hidden=!t}function _(){let t=e(`#submissionDetailModal`).dataset.submissionId;t&&(Q&&Q.abort(),Q=new AbortController,r(`/quests/submissions/${t}`,{signal:Q.signal}).then(({json:t})=>{let n=e(`#submissionLikeCount`),r=e(`#submissionLikeBtn`);n&&(n.textContent=t.like_count||0),r&&r.classList.toggle(`active`,t.liked_by_current_user),Array.isArray(J)&&Y>=0&&(J[Y].like_count=t.like_count,J[Y].liked_by_current_user=t.liked_by_current_user)}).catch(e=>{e.name!==`AbortError`&&console.error(e)}),X||($&&$.abort(),$=new AbortController,r(`/quests/submission/${t}/replies`,{signal:$.signal}).then(({json:t})=>{let r=e(`#submissionRepliesList`);if(!r)return;r.innerHTML=``,t.replies.forEach(e=>{let t=document.createElement(`div`);t.className=`reply mb-1`;let n=document.createElement(`a`);n.href=`#`,n.className=`reply-user-link`,n.dataset.userId=e.user_id;let i=document.createElement(`strong`);i.textContent=e.user_display,n.appendChild(i),t.appendChild(n),t.appendChild(document.createTextNode(`: ${e.content}`)),n.addEventListener(`click`,t=>{t.preventDefault(),p(e.user_id)}),r.appendChild(t)});let i=e(`#submissionReplyEdit`),a=e(`#postReplyBtn`);i&&a&&(t.replies.length>=10?(i.disabled=!0,a.disabled=!0,n&&(n.style.display=`block`)):(i.disabled=!1,a.disabled=!1,n&&(n.style.display=`none`)))}).catch(e=>{e.name!==`AbortError`&&console.error(e)})))}let v=e(`#submissionLikeBtn`);v&&v.addEventListener(`click`,()=>{let t=J[Y]?.id||e(`#submissionDetailModal`).dataset.submissionId;if(!t){alert(`Like failed`);return}let n=v.classList.contains(`active`);c(`/quests/submission/${t}/like`,{method:n?`DELETE`:`POST`,headers:{"Content-Type":`application/json`}}).then(({json:t})=>{if(!t.success)throw Error(t.message||`Like failed`);let n=e(`#submissionLikeCount`);n&&(n.textContent=t.like_count),v.classList.toggle(`active`,t.liked),Array.isArray(J)&&Y>=0&&(J[Y].like_count=t.like_count,J[Y].liked_by_current_user=t.liked)}).catch(e=>alert(e.message))});let y=e(`#postReplyBtn`);y&&y.addEventListener(`click`,()=>{if(X)return;let t=e(`#submissionDetailModal`).dataset.submissionId,n=e(`#submissionReplyEdit`);if(!n)return;let r=n.value.trim();!t||!r||c(`/quests/submission/${t}/replies`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({content:r})}).then(({status:t,json:r})=>{if(!r.success){if(r.message===`Reply limit of 10 reached`){b();return}if(t===409&&r.message===`Duplicate reply`)return alert(`You have already posted that exact reply.`);throw Error(r.message||`Error`)}let i=e(`#submissionRepliesList`),a=document.createElement(`div`);a.className=`reply mb-1`;let o=document.createElement(`strong`);o.textContent=r.reply.user_display,a.appendChild(o),a.appendChild(document.createTextNode(`: ${r.reply.content}`)),i.insertBefore(a,i.firstChild),n.value=``,i.children.length>=10&&b()}).catch(e=>alert(e.message))});function b(){let t=e(`#submissionReplyEdit`),r=e(`#postReplyBtn`);t&&(t.disabled=!0),r&&(r.disabled=!0),n&&(n.style.display=`block`)}a&&a.addEventListener(`click`,()=>{if(!Array.isArray(J)||Y<=0)return;let e=Y-1,t=J[e];t&&q({...t,read_only:X,album_items:J,album_index:e})}),u&&u.addEventListener(`click`,()=>{if(!Array.isArray(J)||Y>=J.length-1)return;let e=Y+1,t=J[e];t&&q({...t,read_only:X,album_items:J,album_index:e})})});export{b as n,p as r,q as t};