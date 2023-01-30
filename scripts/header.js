export const changeInputColorForm = () => {
  const input = document.querySelector("#search");
  input.addEventListener("click", () => {
    input.value.length > 0
      ? (input.style.backgroundColor = "#f7f7f7")
      : (input.style.backgroundColor = "#f7f7f7");
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("#search")) {
      input.value = "";
      input.style.backgroundColor = "";
    }
  });
};

document.addEventListener("DOMContentLoaded", changeInputColorForm);