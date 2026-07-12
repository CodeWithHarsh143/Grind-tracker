console.log("register.js");
let username = document.getElementById("register-username");
let password = document.getElementById("register-password");
let eyeBtn = document.getElementById('register-password-toggle');
username.addEventListener("input",validateUsername);
password.addEventListener("input",validatePassword);
eyeBtn.addEventListener("click",toggle_eye);
function validateUsername(){
  let username_value = username.value.trim();
  checkLength("register-username-error" , username_value.length>=3);
}
function checkLength(id, passed){
  let element = document.getElementById(id);
  if(passed){
    element.classList.add("hidden");
  }else{
    element.classList.remove("hidden");
  }
}
function validatePassword(){
  let requirements = document.querySelectorAll("#password-requirements li");
  let password_value = password.value;
  // rule is a requirement element
  requirements.forEach(rule => {
    switch (rule.dataset.requirement) {
      case "length":
      updateRule(rule,password_value.length>=8);
        break;
      case "uppercase":
        let uppercaseCount = (password_value.match(/[A-Z]/g) || []).length;
        // give an array of uppercase
        updateRule(rule,uppercaseCount === 1);
        break;
      case "number":
        let numbercount = (password_value.match(/\d/g) || []).length;
        updateRule(rule , numbercount === 1)
        break;
      case "special":
       let numberOfSpecialChar = (password_value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;
        updateRule(rule , numberOfSpecialChar === 1);
        break;
    }
  });
  lucide.createIcons();
}
function updateRule(element, passed) {
  const icon = element.querySelector("svg, i");

  if (passed) {
    element.classList.add("text-green-500");
  } else {
    element.classList.remove("text-green-500");
  }

  if (icon) {
    icon.outerHTML = passed
      ? lucide.icons["check-circle"].toSvg({ class: "w-3 h-3" })
      : lucide.icons.circle.toSvg({ class: "w-3 h-3" });
  }
}
function toggle_eye() {
  const icon = eyeBtn.querySelector("svg, i");

  if (password.type === "password") {
    password.type = "text";
    icon.outerHTML = lucide.icons["eye-off"].toSvg({
      class: "w-4 h-4",
    });
  } else {
    password.type = "password";
    icon.outerHTML = lucide.icons.eye.toSvg({
      class: "w-4 h-4",
    });
  }
}
const form = document.getElementById("register-form");
form.addEventListener("submit",function(e){
  e.preventDefault();
  // elements for data
  let name = document.getElementById("register-name");
  let email = document.getElementById("register-email");
  let confirm_password = document.getElementById("register-confirm-password");
  // error elements
  let name_error = document.getElementById("register-name-error");
  let password_error = document.getElementById("register-password-error");
  let confirm_password_error = document.getElementById("register-confirm-error");
  let email_error = document.getElementById("register-email-error");
  let valid = true;
  if(name.value.trim() === ""){
    name_error.classList.remove("hidden");
    name.classList.add("border-red-500");
    name.classList.remove("border-[var(--color-border)]");
    valid  = false;
  }
  else{
    name_error.classList.add("hidden");
    name.classList.remove("border-red-500");
    name.classList.add("border-[var(--color-border)]");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email.value.trim())){
    email.classList.remove("border-[var(--color-border)]");
    email.classList.add("border-red-500");
    email_error.classList.remove("hidden");
    valid = false;
  }else{
    email.classList.remove("border-red-500");
    email.classList.add("border-[var(--color-border)]");
    email_error.classList.add("hidden");
  }
  const uppercaseCount = (password.value.match(/[A-Z]/g) || []).length;
  const numberCount = (password.value.match(/\d/g) || []).length;
  const specialCount = (password.value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;

  if (
  password.value.length < 8 ||
  uppercaseCount !== 1 ||
  numberCount !== 1 ||
  specialCount !== 1
  )
  {
  password.classList.add("border-red-500");
  password.classList.remove("border-[var(--color-border)]");
  password_error.classList.remove("hidden");
  valid = false;
  }
  else {
  password.classList.remove("border-red-500");
  password.classList.add("border-[var(--color-border)]");
  password_error.classList.add("hidden");
  }
  if(password.value !== confirm_password.value){
    confirm_password.classList.remove("border-[var(--color-border)]");
    confirm_password.classList.add('border-red-500');
    confirm_password_error.classList.remove("hidden");
    valid = false;
  }else{
    confirm_password.classList.add("border-[var(--color-border)]");
    confirm_password.classList.remove('border-red-500');
    confirm_password_error.classList.add("hidden");
  }
  if(valid)
    form.submit();
})
