import { changeInputColorForm } from "/scripts/header.js";
// import { inputForm } from "/scripts/dropdown.js";


(function show(text) {
    document.querySelector("#ingredients").value = text;
  })();

(function hide() {
    document.querySelector("#ingredients").value = "";
})()


// let dropdown = document.querySelectorAll(".dropdown")
// let dropdownInput = document.querySelector("#ingredients")
// dropdown.forEach(drop => {
//     drop.addEventListener('click', () => {
//         drop.classList.toggle('active')
//         if (drop.classList.contains("active")) {
//             dropdownInput.removeAttribute("readonly");
//     } else {
//         dropdownInput.setAttribute("readonly", true);
//     }
// })});
// dropdownInput.addEventListener("focus", function(){
//     if (dropdown.classList.contains("active")) {
//         dropdownInput.readOnly = false;
//     }
// });
// dropdownInput.addEventListener("blur", function(){
//     dropdownInput.readOnly = true;
// });

let dropdown = document.querySelectorAll(".dropdown");
let dropdownInput = document.querySelector("#ingredients");
let activeDropdown;

function closeAllDropdowns() {
  dropdown.forEach(drop => {
    if (drop.classList.contains("active")) {
      drop.classList.remove("active");
      dropdownInput.setAttribute("readonly", true);
    }
  });
}

dropdown.forEach(drop => {
  drop.addEventListener("click", () => {
    if (activeDropdown && activeDropdown !== drop) {
      closeAllDropdowns();
    }
    drop.classList.toggle("active");
    activeDropdown = drop;
    if (drop.classList.contains("active")) {
      dropdownInput.removeAttribute("readonly");
    } else {
      dropdownInput.setAttribute("readonly", true);
    }
  });
});

dropdownInput.addEventListener("focus", function() {
  if (activeDropdown && activeDropdown.classList.contains("active")) {
    dropdownInput.readOnly = false;
  }
});

dropdownInput.addEventListener("blur", function() {
  dropdownInput.readOnly = true;
});

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 13 && activeDropdown && activeDropdown.classList.contains("active")) {
    closeAllDropdowns();
  }
});






async function init() {
  changeInputColorForm()
}

init().then(() => {});





