export const clearInputFieldsReg = (): void => {
  const avatar = document.getElementById("avatar") as HTMLInputElement;
  const name = document.getElementById("fullname") as HTMLInputElement;
  const username = document.getElementById("username") as HTMLInputElement;
  const email = document.getElementById("email") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;
  const password2 = document.getElementById(
    "confirm_password"
  ) as HTMLInputElement;
  const imageElem = document.getElementById(
    "display-avatar"
  ) as HTMLImageElement;

  avatar.value = "";
  name.value = "";
  username.value = "";
  email.value = "";
  password.value = "";
  password2.value = "";

  imageElem.src =
    "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
};
