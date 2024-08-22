export const getFormData = (): object | null => {
  const usernameOrEmail = document.getElementById(
    "login-username-email"
  ) as HTMLInputElement;
  const password = document.getElementById(
    "login-password"
  ) as HTMLInputElement;

  if ([usernameOrEmail, password].some((field) => field?.value.trim() === "")) {
    alert("Please fill all the fields");
    return null;
  }

  const formData = {
    usernameOrEmail: usernameOrEmail.value.trim(),
    password: password.value.trim(),
  };

  return formData;
};
