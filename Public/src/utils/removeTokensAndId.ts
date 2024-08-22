export const removeTokenAndId = () => {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("RefreshToken");
  localStorage.removeItem("_id");
};
