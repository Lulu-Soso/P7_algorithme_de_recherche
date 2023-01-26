(function show(text) {
    document.querySelector("#ingredients").value = text;
  })();

(function hide() {
    document.querySelector("#ingredients").value = "";
})()
//   let dropdown = document.querySelectorAll(".dropdown")
//   let dropdownInput = document.querySelector("#ingredients")
//   dropdown.forEach(drop => {
//       drop.addEventListener('click', () => {
//           drop.classList.toggle('active')
//           if (drop.classList.contains("active")) {
//               dropdownInput.removeAttribute("readonly");
//       } else {
//           dropdownInput.setAttribute("readonly", true);
//       }
//   })});
//   dropdownInput.addEventListener("focus", function(){
//       if (dropdown.classList.contains("active")) {
//           dropdownInput.readOnly = false;
//       }
//   });
//   dropdownInput.addEventListener("blur", function(){
//       dropdownInput.readOnly = true;
//   });

let selectedOption = "";
let options = document.querySelectorAll(".option div");
options.forEach(option => {
    option.addEventListener('click', () => {
        selectedOption = option.innerText;
    });
});
let dropdown = document.querySelectorAll(".dropdown")
let dropdownInput = document.querySelector("#ingredients")
dropdown.forEach(drop => {
    drop.addEventListener('click', () => {
        drop.classList.toggle('active')
        if (drop.classList.contains("active")) {
            dropdownInput.removeAttribute("readonly");
        } else {
            dropdownInput.setAttribute("readonly", true);
            dropdownInput.value = selectedOption;
        }
    });
});


