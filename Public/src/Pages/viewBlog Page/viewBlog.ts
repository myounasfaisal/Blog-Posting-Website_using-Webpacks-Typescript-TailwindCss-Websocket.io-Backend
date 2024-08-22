import "../../style.css";
import { submitBtnStyle } from "./utils/submitBtnStyle";
import { getCommentData } from "./functions/getCommentData";
import { clearInputFieldComment } from "./utils/clearInputFieldComment";
import { postReqForBlogAndAuthor } from "./functions/postReqForBlogAndAuthor";
import { renderContent } from "./functions/renderContent";
import { logoutReq } from "../../functions/request/logoutReq";
import { isUserLogin } from "../../utils/isUserLogin";
import { removeTokenAndId } from "../../utils/removeTokensAndId";
import { commentReq } from "./functions/request/commentReq";
import { appendComment } from "./utils/appendComment";
import { getCommentsReq } from "./functions/request/getCommentsReq";
import { appendCommentsToBlog } from "./utils/appendCommentsToBlog";
import { idFromLocalStorage } from "../../utils/idFromLocalStorage";

const loginPageBtn = document.getElementById("login-page") as HTMLElement;
const registerPageBtn = document.getElementById("register-page") as HTMLElement;
const commentCount = document.getElementById("comments-count") as HTMLElement;
submitBtnStyle();
let commentNum: number;

document.addEventListener("DOMContentLoaded", async () => {
  const commentData = await getCommentsReq();
  commentNum = commentData.length;
  commentCount.textContent = `${commentNum} comments`;
  appendCommentsToBlog(commentData);
});

document
  .getElementById("add-comment-btn")
  ?.addEventListener("click", async () => {
    const comment = getCommentData();
    const id = idFromLocalStorage();
    if (comment && id) {
      const data = await commentReq(comment);
      commentNum += 1; // Increment commentNum when a new comment is successfully added
      commentCount.textContent = `${commentNum} comments`; // Update the comment count display
      appendComment(data);
      clearInputFieldComment();
    } else {
      alert("Please log in to add a comment");
    }
  });

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

  // Fetch blog data and render it on the page
  const data = await postReqForBlogAndAuthor();

  console.log("Data : ", data.blog.content);

  const blog = document.getElementById("blog-by-author") as HTMLElement;
  blog.innerHTML = "";

  renderContent(data.blog.content, blog);
});
