import { hideElement } from "./hideElement";
import { isUserLogin } from "./isUserLogin";

export const hideLoginRegister = () => {
  const registerPageBtn = document.getElementById(
    "register-page"
  ) as HTMLElement;
  const loginPageBtn = document.getElementById("login-page") as HTMLElement;

  const check = isUserLogin();

  if (check) {
    hideElement(loginPageBtn);
    hideElement(registerPageBtn);
  }
};
