let password  = document.getElementById("login-password");
let eyeBtn = document.getElementById("login-password-toggle");
eyeBtn.addEventListener("click",toggle_eye);
function toggle_eye(){
  let icon  = eyeBtn.querySelector("svg, i");
  let newIcon = password.type === "password"
      ?lucide.createElement(lucide.EyeOff)
      :lucide.createElement(lucide.Eye);
  newIcon.classList.add("w-4", "h-4");
  icon.replaceWith(newIcon);
  password.type = password.type === "password"?"text":"password";
}
let form = document.getElementById("login-form");
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  // elements
  let email = document.getElementById("login-email");
  // errors
  let email_error = document.getElementById("login-email-error");
  // validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;
  if(!emailRegex.test(email.value.trim())){
    email.classList.add("border-red-500");
    email.classList.remove("border-[var(--color-border)]");
    email_error.classList.remove("hidden");
    valid = false;
  }else{
    email.classList.add("border-[var(--color-border)]");
    email.classList.remove("border-red-500");
    email_error.classList.add("hidden");
  }

  if(valid)
    form.submit();
})
