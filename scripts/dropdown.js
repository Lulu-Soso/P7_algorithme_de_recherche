// let dropdown = document.querySelectorAll(".dropdown");
// let dropdownInput = document.querySelector("#ingredients");
// let activeDropdown;

// export function closeAllDropdowns() {
//   dropdown.forEach((drop) => {
//     if (drop.classList.contains("active")) {
//       drop.classList.remove("active");
//       dropdownInput.setAttribute("readonly", true);
//     }
//   });
// }
// dropdown.forEach((drop) => {
//   drop.addEventListener("click", () => {
//     if (activeDropdown && activeDropdown !== drop) {
//       closeAllDropdowns();
//     }
//     drop.classList.toggle("active");
//     activeDropdown = drop;
//     if (drop.classList.contains("active")) {
//       dropdownInput.removeAttribute("readonly");
//     } else {
//       dropdownInput.setAttribute("readonly", true);
//     }
//   });
// });

// dropdownInput.addEventListener("focus", function () {
//   if (activeDropdown && activeDropdown.classList.contains("active")) {
//     dropdownInput.readOnly = false;
//   }
// });

// dropdownInput.addEventListener("blur", function () {
//   dropdownInput.readOnly = true;
// });

// document.addEventListener("keydown", function (e) {
//   if (
//     e.keyCode === 13 &&
//     activeDropdown &&
//     activeDropdown.classList.contains("active")
//   ) {
//     closeAllDropdowns();
//   }
// });

let dropdowns = document.querySelectorAll(".dropdown");
let dropdownInputs = document.querySelectorAll(
  ".input-ingredients, .input-appliances, .input-utensils"
);
let activeDropdown;

export function closeDropdowns() {
  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove("active");
  });
  dropdownInputs.forEach((input) => {
    input.value = "";
    input.setAttribute("readonly", true);
  });
  activeDropdown = null;
}

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", () => {
    if (activeDropdown && activeDropdown !== dropdown) {
      closeDropdowns();
    }
    dropdown.classList.toggle("active");
    let input = dropdown.querySelector("input");
    if (dropdown.classList.contains("active")) {
      input.removeAttribute("readonly");
      input.focus();
      activeDropdown = dropdown;
    } else {
      input.value = "";
      input.setAttribute("readonly", true);
      input.placeholder = input.getAttribute("data-placeholder");
      activeDropdown = null;
    }
  });
});

document.addEventListener("click", function (event) {
  if (
    activeDropdown &&
    !activeDropdown.
contains(event.target) &&
!dropdownInputs.includes(event.target) &&
event.target.closest(".dropdown") === null
) {
closeDropdowns();
}
});

window.addEventListener("click", function (event) {
if (activeDropdown && !activeDropdown.contains(event.target)) {
closeDropdowns();
}
});

