export const setTokenToLocalStorage = (
  accessToken: string,
  refreshToken: string
) => {
  localStorage.setItem("AccessToken", accessToken);
  localStorage.setItem("RefreshToken", refreshToken);
};
