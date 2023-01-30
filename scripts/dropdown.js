let dropdown = document.querySelectorAll(".dropdown");
let dropdownInput = document.querySelector("#ingredients");
let activeDropdown;

export function closeAllDropdowns() {
  dropdown.forEach((drop) => {
    if (drop.classList.contains("active")) {
      drop.classList.remove("active");
      dropdownInput.setAttribute("readonly", true);
    }
  });
}
dropdown.forEach((drop) => {
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

dropdownInput.addEventListener("focus", function () {
  if (activeDropdown && activeDropdown.classList.contains("active")) {
    dropdownInput.readOnly = false;
  }
});

dropdownInput.addEventListener("blur", function () {
  dropdownInput.readOnly = true;
});

document.addEventListener("keydown", function (e) {
  if (
    e.keyCode === 13 &&
    activeDropdown &&
    activeDropdown.classList.contains("active")
  ) {
    closeAllDropdowns();
  }
});
