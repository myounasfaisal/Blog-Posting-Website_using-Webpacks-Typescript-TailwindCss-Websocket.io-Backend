import { logoutReq } from "../../functions/request/logoutReq";
import "../../style.css";
import { isUserLogin } from "../../utils/isUserLogin";
import { removeTokenAndId } from "../../utils/removeTokensAndId";
import { appendDataToProfilePage } from "./Functions/appendDataToProfilePage";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await appendDataToProfilePage();
    toastr.success("Profile data loaded successfully!");
  } catch (error) {
    toastr.error("Failed to load profile data.");
  }

  // Button elements
  const profileBtn = document.getElementById("profile-page-btn") as HTMLElement;
  const accountBtn = document.getElementById("account-page-btn") as HTMLElement;
  const loginBtn = document.getElementById("login-page") as HTMLElement;
  const registerBtn = document.getElementById("register-page") as HTMLElement;

  const check = isUserLogin();

  if (check) {
    // User is logged in
    if (registerBtn) {
      registerBtn.textContent = "Create Post";
      registerBtn.id = "create-post";
      registerBtn.addEventListener("click", () => {
        window.location.href = "./Blog.html";
      });
    }

    if (loginBtn) {
      loginBtn.textContent = "Log Out";
      loginBtn.id = "log-out";
      loginBtn.addEventListener("click", async () => {
        try {
          await logoutReq();
          removeTokenAndId();
          toastr.success("Logged out successfully!");
          // Redirect to home page after logout
          setTimeout(() => {
            window.location.href = "./index.html";
          }, 800); // Delay redirection by 800ms
        } catch (error) {
          toastr.error("Failed to log out.");
        }
      });
    }
  } else {
    const navBar = document.getElementById("navbar");
    navBar?.classList.add("hidden");
    // User is not logged in
    if (registerBtn) {
      registerBtn.textContent = "Register";
      registerBtn.id = "register-page";
      registerBtn.addEventListener("click", () => {
        window.location.href = "./Register.html";
      });
    }

    if (loginBtn) {
      loginBtn.textContent = "Login";
      loginBtn.id = "login-page";
      loginBtn.addEventListener("click", () => {
        window.location.href = "./Login.html";
      });
    }
  }

  // Common event listeners for other buttons
  profileBtn?.addEventListener("click", () => {
    window.location.href = "./Profile.html";
  });

  accountBtn?.addEventListener("click", () => {
    window.location.href = "./Account.html";
  });
});
