interface FormDataPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const getFormData = (): FormDataPassword => {
  const currentPasswordInput = document.getElementById(
    "current-password"
  ) as HTMLInputElement;
  const newPasswordInput = document.getElementById(
    "new-password"
  ) as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
    "confirm-password"
  ) as HTMLInputElement;

  return {
    currentPassword: currentPasswordInput.value,
    newPassword: newPasswordInput.value,
    confirmPassword: confirmPasswordInput.value,
  };
};
