import "../../style.css";
import { hideLoginRegister } from "../../utils/hideLoginRegister";
import { isUserLogin } from "../../utils/isUserLogin";
import { sendingRegReq } from "./Functions/sendingRegReq";
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
      window.location.href = "./Login.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const check = isUserLogin();
  console.log("Hide Buttons");
});
document.getElementById("reg-btn")?.addEventListener("click", (evt) => {
  evt.preventDefault();
  sendingRegReq();
});
