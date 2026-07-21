import { userNameStatus } from "./api.js";

// ------------------------User name checking feature ---------------------------
const name = document.getElementById("profile-name");
const nameError = document.getElementById("profile-name-error");
name.addEventListener("input",()=>{
  if(name.value.trim().length == 0){
    nameError.classList.remove("hidden");
  }else{
    nameError.classList.add("hidden");
  }
})
const usernameInput = document.getElementById("profile-username");
const usernameError = document.getElementById("profile-username-error");
const usernameAvailable = document.getElementById("profile-username-avialable");
const usernameLength = document.getElementById("profile-username-length");
const loading = document.getElementById("profile-loading");

let debounceTimer;
let currentRequest = 0;

function hideMessages() {
  usernameError.classList.add("hidden");
  usernameAvailable.classList.add("hidden");
  loading.classList.add("hidden");
}

usernameInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    const username = usernameInput.value.trim();

    hideMessages();

    if (username.length < 3) {
      usernameLength.classList.remove("hidden");
      return;
    }

    usernameLength.classList.add("hidden");

    loading.classList.remove("hidden");

    // Every request gets a unique id
    const requestId = ++currentRequest;

    try {
      const data = await userNameStatus(username);

      // Ignore old responses
      if (requestId !== currentRequest) return;

      loading.classList.add("hidden");

      if (data.available) {
        usernameAvailable.classList.remove("hidden");
      } else {
        usernameError.classList.remove("hidden");
      }
    } catch (err) {
      loading.classList.add("hidden");

      console.error(err);
    }
  }, 300);
});

//------------------------------------Bio feature--------------------------------------------------------------------
const bioInput = document.getElementById("profile-bio");
const counter = document.getElementById("bio-char-count");
const limit = 160;

function updateCounter() {
  const text = bioInput.value.trim();

  // Handle empty input
  const words = text === "" ? [] : text.split(/\s+/);
  const length = words.length;

  counter.textContent = `${length}/${limit}`;

  if (length > limit) {
    bioInput.value = words.slice(0, limit).join(" ");
    counter.textContent = `${limit}/${limit}`;
  }
}

// Initial count
updateCounter();

// Update on typing
bioInput.addEventListener("input", updateCounter);

//---------------------------------------------URL feature ---------------------------------------
const patterns = {
  "leetcode-link": /^https:\/\/(www\.)?leetcode\.com\/(u\/)?[A-Za-z0-9_-]+\/?$/,
  "github-link": /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
  "linkedin-link": /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?$/,
};
const leetcode_link = document.getElementById("leetcode-link");
const github_link  = document.getElementById("github-link");
const linkdin_link  = document.getElementById("linkdin-link");
function checkURL(event) {
  const input = event.currentTarget;
  const url = input.value.trim();
  const error = document.getElementById(`${input.id}-error`);
  if (url === "") {
    error.classList.add("hidden");
    return;
  }

  // Platform-specific validation
  if (patterns[input.id]) {
    if (patterns[input.id].test(url)) {
      error.classList.add("hidden");
    } else {
      error.classList.remove("hidden");
    }
    return; // Stop here for platform URLs
  }

  // Generic website validation
  try {
    new URL(url);
    error.classList.add("hidden");
  } catch {
    error.classList.remove("hidden");
  }
}

document.querySelectorAll("input[type='url']").forEach((input) => {
  input.addEventListener("blur", checkURL);
});
//--------------------------------------------------prefrence-------------------------------------------
const toggle = document.getElementById("public-profile-toggle");
const emailToggle = document.getElementById("streak-reminder-toggle");

const publicInput = document.getElementById("public-profile-input");
const streakInput = document.getElementById("streak-reminder-input");

let isPublic = toggle.getAttribute("aria-checked") === "true";
let isStreak = emailToggle.getAttribute("aria-checked") === "true";

updateUI(toggle, isPublic);
updateUI(emailToggle, isStreak);

toggle.addEventListener("click", () => {
    isPublic = !isPublic;
    updateUI(toggle, isPublic);
});

emailToggle.addEventListener("click", () => {
    isStreak = !isStreak;
    updateUI(emailToggle, isStreak);
});

function updateUI(toggle, state) {
    const knob = toggle.querySelector("span");

    toggle.setAttribute("aria-checked", state);

    if (state) {
        toggle.classList.remove("bg-[var(--color-border)]");
        toggle.classList.add("bg-[var(--color-primary)]");

        knob.classList.remove("translate-x-1");
        knob.classList.add("translate-x-6");
    } else {
        toggle.classList.remove("bg-[var(--color-primary)]");
        toggle.classList.add("bg-[var(--color-border)]");

        knob.classList.remove("translate-x-6");
        knob.classList.add("translate-x-1");
    }
}
// ------------------------------------------------Delete Account-------------------------
const deleteBtn = document.getElementById("delete-account-btn")
const cancelBtn = document.getElementById("cancel-delete")
const delete_model = document.getElementById("delete-modal")
const confirmBtn = document.getElementById("confirm-delete")
const modelContent = document.getElementById("delete-modal-content")
deleteBtn.addEventListener("click" , ()=>{
  delete_model.classList.remove("hidden")
  delete_model.classList.add("flex")
  requestAnimationFrame(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
        modalContent.classList.add("scale-100", "opacity-100");
    });
})
cancelBtn.addEventListener("click", () => {

    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
        delete_modal.classList.remove("flex");
        delete_modal.classList.add("hidden");
    }, 200);

});
confirmBtn.addEventListener("click", async () => {
    const response = await fetch("/delete-account", { // send login session cookie
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) { // 200
        window.location.href = "/login"; // redirct to login
     } else {
        alert("Failed to delete account.");
    }
});

//----------------------------------------------------------Save Changes---------------------
const form = document.getElementById("profile-form");
form.addEventListener("submit" , async (e)=>{
  e.preventDefault();
  let valid = true;
  if(name.value.length === 0){
    nameError.classList.remove("hidden");
    valid = false;
  }else{
    nameError.classList.add("hidden")
  }
  if(usernameInput.value.length === 0){
    usernameError.classList.remove("hidden")
    valid = false;
  }
  else{
    usernameError.classList.add("hidden")
  }

  if(valid)
    form.submit();

})
