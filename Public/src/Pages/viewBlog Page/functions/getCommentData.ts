export const getCommentData = (): string | null => {
  const commentInputField = document.getElementById(
    "user-comment"
  ) as HTMLInputElement;
  if (commentInputField) {
    const comment = commentInputField.value.trim();
    if (comment == "") {
      alert("Comment Field Can't be Empty");
    } else {
      return comment;
    }
  }
  return null;
};
