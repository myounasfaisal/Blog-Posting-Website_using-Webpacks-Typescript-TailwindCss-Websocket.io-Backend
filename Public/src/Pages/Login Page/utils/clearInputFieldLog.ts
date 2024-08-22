export const clearInputField = () => {
  const usernameOrEmail = document.getElementById(
    "login-username-email"
  ) as HTMLInputElement;

  const password = document.getElementById(
    "login-password"
  ) as HTMLInputElement;

  usernameOrEmail.value = "";

  password.value = "";
};
