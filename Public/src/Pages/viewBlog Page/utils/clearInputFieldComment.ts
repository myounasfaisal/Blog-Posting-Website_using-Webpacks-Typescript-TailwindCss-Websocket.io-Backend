export const clearInputFieldComment = () => {
  const CommentField = document.getElementById(
    "user-comment"
  ) as HTMLInputElement;
  CommentField.value = "";
};
