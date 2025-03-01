import { logoutReq } from "./functions/request/logoutReq";
import { sendingReqAndAppending } from "./functions/sendingReqAndAppending";
import "./style.css";
import { idFromLocalStorage } from "./utils/idFromLocalStorage";
import { isUserLogin } from "./utils/isUserLogin";
import { removeTokenAndId } from "./utils/removeTokensAndId";
import { userIdToSession } from "./utils/userIdToSession";
import toastr from "toastr"; // Import toastr
import "toastr/build/toastr.min.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 3000,
};

const profilePageBtn = document.getElementById(
  "profile-page-btn"
) as HTMLElement;
const accountPageBtn = document.getElementById(
  "account-page-btn"
) as HTMLElement;
const registerPageBtn = document.getElementById("register-page") as HTMLElement;
const loginPageBtn = document.getElementById("login-page") as HTMLElement;

document.addEventListener("DOMContentLoaded", async () => {
  const check = isUserLogin();

  if (check) {
    if (registerPageBtn) {
      registerPageBtn.textContent = "Create Post";
      registerPageBtn.id = "create-post";

      const createPost = document.getElementById("create-post");
      if (createPost) {
        createPost.addEventListener("click", () => {
          window.location.href = "./Blog.html";
        });
      }
    }

    if (loginPageBtn) {
      loginPageBtn.textContent = "Log Out";
      loginPageBtn.id = "log-out";

      const logoutBtn = document.getElementById("log-out");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
          await logoutReq();
          removeTokenAndId();

          toastr.success("Logged out successfully!");

          // Change buttons back to "Register" and "Login"
          registerPageBtn.textContent = "Register";
          registerPageBtn.id = "register-page";
          registerPageBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "Register.html";
          });

          loginPageBtn.textContent = "Login";
          loginPageBtn.id = "login-page";
          loginPageBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "Login.html";
          });

          setTimeout(() => {
            window.location.href = "./index.html"; // Redirect to home page after logout
          }, 800);
        });
      }
    }
  } else {
    const navBar = document.getElementById("navbar");
    navBar?.classList.add("hidden");
    // Ensure buttons are in their default state if the user is not logged in
    registerPageBtn.textContent = "Register";
    registerPageBtn.id = "register-page";
    registerPageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Register.html";
    });

    loginPageBtn.textContent = "Login";
    loginPageBtn.id = "login-page";
    loginPageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Login.html";
    });
  }

  accountPageBtn.addEventListener("click", () => {
    window.location.href = "./Account.html";
  });

  profilePageBtn.addEventListener("click", () => {
    const Id = idFromLocalStorage();
    userIdToSession(Id);
    toastr.info("Redirecting to your profile...");
    window.location.href = "./Profile.html";
  });

  try {
    await sendingReqAndAppending();
    toastr.success("Blogs loaded successfully!");
  } catch (error) {
    toastr.error("Failed to load blogs.");
    console.error("Error loading blogs:", error);
  }
});
