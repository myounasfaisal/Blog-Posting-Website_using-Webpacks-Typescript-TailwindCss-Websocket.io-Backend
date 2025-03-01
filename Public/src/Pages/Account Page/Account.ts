import { logoutReq } from "../../functions/request/logoutReq";
import "../../style.css";
import { isUserLogin } from "../../utils/isUserLogin";
import { removeTokenAndId } from "../../utils/removeTokensAndId";
import { handleDeleteAccount } from "./functions/requests/deleteAccReq";
import { handleUpdatePassword } from "./functions/requests/passwordChangeReq";
import "toastr/build/toastr.min.css";
const loginPageBtn = document.getElementById("login-page-btn") as HTMLElement;
const registerPageBtn = document.getElementById(
  "register-page-btn"
) as HTMLElement;
const profilePageBtn = document.getElementById(
  "profile-page-btn"
) as HTMLElement;
document.addEventListener("DOMContentLoaded", async () => {
  const check = isUserLogin();

  if (check) {
    const updatePasswordBtn = document.getElementById(
      "update-password-btn"
    ) as HTMLButtonElement;
    const deleteAccountBtn = document.getElementById(
      "dlt-btn"
    ) as HTMLButtonElement;

    if (updatePasswordBtn) {
      updatePasswordBtn.addEventListener("click", handleUpdatePassword);
    }

    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener("click", handleDeleteAccount);
    }
    if (registerPageBtn) {
      registerPageBtn.textContent = "Create Post";
      registerPageBtn.id = "create-post";

      const createPost = document.getElementById("create-post");
      if (createPost)
        createPost.addEventListener("click", () => {
          window.location.href = "./Blog.html";
        });
    }

    if (loginPageBtn) {
      loginPageBtn.textContent = "Log Out";
      loginPageBtn.id = "log-out";

      const logoutBtn = document.getElementById("log-out");
      if (logoutBtn)
        logoutBtn.addEventListener("click", async () => {
          await logoutReq();
          removeTokenAndId();

          // Change buttons back to "Create Account" and "Log In"
          registerPageBtn.textContent = "Create Account";
          registerPageBtn.id = "register-page";
          registerPageBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "Register.html";
          });

          loginPageBtn.textContent = "Log In";
          loginPageBtn.id = "login-page";
          loginPageBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "Login.html";
          });

          window.location.href = "./index.html"; // Redirect to home page after logout
        });
    }
  } else {
    // Ensure buttons are in their default state if the user is not logged in
    registerPageBtn.textContent = "Create Account";
    registerPageBtn.id = "register-page";
    registerPageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Register.html";
    });

    loginPageBtn.textContent = "Log In";
    loginPageBtn.id = "login-page";
    loginPageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Login.html";
    });
  }

  profilePageBtn.addEventListener("click", () => {
    window.location.href = "./Profile.html";
  });
});
