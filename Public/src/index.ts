import { getAllBlogsReq } from "./functions/request/getAllBlogsReq";
import { logoutReq } from "./functions/request/logoutReq";
import { sendingReqAndAppending } from "./functions/sendingReqAndAppending";
import { appendDataToProfilePage } from "./Pages/Profile Page/Functions/appendDataToProfilePage";
import "./style.css";
import { hideLoginRegister } from "./utils/hideLoginRegister";
import { idFromLocalStorage } from "./utils/idFromLocalStorage";
import { isUserLogin } from "./utils/isUserLogin";
import { removeTokenAndId } from "./utils/removeTokensAndId";
import { setBlogIdSessionStorage } from "./utils/setBlogIdSessionStorage";
import { userIdToSession } from "./utils/userIdToSession";

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
    window.location.href = "./Profile.html";
  });

  await sendingReqAndAppending();
});
