const profileBtn = document.getElementById("profile-menu-btn");
if (!profileBtn) throw new Error("Missing profile menu button");
const logoutBtn = document.getElementById("logout-btn");
if (!logoutBtn) throw new Error("Missing logout button");
profileBtn.addEventListener("click", () => {
  const dropdown = document.getElementById("profile-dropdown");
  const chevron_icon = profileBtn.querySelectorAll("svg, i")[1];
  if (!dropdown || !chevron_icon) return;

  const new_chevron_icon = lucide.createElement(
    dropdown.classList.contains("hidden")
      ? lucide.ChevronUp
      : lucide.ChevronDown,
  );
  new_chevron_icon.classList.add("w-3.5", "h-3.5");
  chevron_icon.replaceWith(new_chevron_icon);
  dropdown.classList.toggle("hidden");
  lucide.createIcons();
});
logoutBtn.addEventListener("click", () => {
  profileBtn.add("hidden");
});
