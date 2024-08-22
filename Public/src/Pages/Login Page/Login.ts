import "../../style.css";
import { sendingLogReq } from "./Functions/sendingLogReq";
import { isUserLogin } from "../../utils/isUserLogin";
import { logoutReq } from "../../functions/request/logoutReq";
import { removeTokenAndId } from "../../utils/removeTokensAndId";

const loginBtn = document.getElementById("login-btn") as HTMLElement;
const registerPageBtn = document.getElementById("register-page") as HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
  const check = isUserLogin();

  if (check) {
    if (registerPageBtn) {
      registerPageBtn.textContent = "Create Post";
      registerPageBtn.id = "create-post";

      const createPost = document.getElementById("create-post");
      if (createPost)
        createPost.addEventListener("click", () => {
          window.location.href = "./Blog.html";
        });
    }

    if (loginBtn) {
      loginBtn.textContent = "Log Out";
      loginBtn.id = "log-out";

      const logoutBtn = document.getElementById("log-out");
      if (logoutBtn)
        logoutBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          await logoutReq();
          removeTokenAndId();

          // Revert buttons to default state after logging out
          registerPageBtn.textContent = "Register";
          registerPageBtn.id = "register-page";
          registerPageBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "Register.html";
          });

          loginBtn.textContent = "Log In";
          loginBtn.id = "login-btn";
          loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            sendingLogReq();
          });

          window.location.href = "./index.html"; // Redirect to home page after logout
        });
    }
  } else {
    // Ensure buttons are in their default state if the user is not logged in
    registerPageBtn.textContent = "Register";
    registerPageBtn.id = "register-page";
    registerPageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Register.html";
    });

    loginBtn.textContent = "Log In";
    loginBtn.id = "login-btn";
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sendingLogReq();
    });
  }
});

loginBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  await sendingLogReq();
  window.location.href = "./index.html"; // Redirect to home page after successful login
});
