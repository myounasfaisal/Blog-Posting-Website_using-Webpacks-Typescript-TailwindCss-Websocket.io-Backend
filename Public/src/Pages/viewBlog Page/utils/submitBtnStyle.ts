export const submitBtnStyle = () => {
  document.getElementById("user-comment")?.addEventListener("click", () => {
    document
      .getElementById("add-comment-btn")
      ?.classList.add("border-blue-400");
  });
  document.getElementById("user-comment")?.addEventListener("blur", () => {
    document
      .getElementById("add-comment-btn")
      ?.classList.remove("border-blue-400");
  });
};
