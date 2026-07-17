import { userNameStatus } from "./api.js";

const usernameInput = document.getElementById("profile-username");
// ------------------------User name checking feature ---------------------------
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
