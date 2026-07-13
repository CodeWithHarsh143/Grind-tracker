document.addEventListener("DOMContentLoaded" ,()=>{
  lucide.createIcons();
  document.querySelectorAll(".flash-dismiss").forEach((button)=>{
    button.addEventListener("click",(e)=>remove_message(e));
  });
});

function remove_message(e) {
  const msg = e.currentTarget.closest(".flash-message");
  msg.style.transition = "opacity 0.5s"; // trnasition on opacity
  msg.style.opacity = "0"; // till opacity became zero
  setTimeout(() => {
    msg.remove() // removing entire element
  }, 500);

}
