import { avatarFromLocalStorage } from "../../../utils/avatarFromLocalStorage";
import { createFollowDoc } from "../../../utils/createFollowDocReq";
import { createLikeDoc } from "../../../utils/createLikeDocReq";
import { idFromLocalStorage } from "../../../utils/idFromLocalStorage";
import { userIdToSession } from "../../../utils/userIdToSession";
import { followReq } from "./request/followReq";
import { likeReq } from "./request/likeReq";

export const appendDetails = async (Data: any) => {
  const avatar = document.getElementById("author-img") as HTMLImageElement;
  const name = document.getElementById("author-name") as HTMLElement;
  const followBtn = document.getElementById("follow-btn") as HTMLButtonElement;
  const likeBtn = document.getElementById("like-btn") as HTMLButtonElement;
  const likeIcon = document.getElementById("like-icon") as HTMLElement;
  const likeCountElement = document.getElementById("like-count") as HTMLElement;
  const commentAvatar = document.getElementById(
    "comment-avatar"
  ) as HTMLImageElement;

  const loggedInUser = idFromLocalStorage();

  if (
    !avatar ||
    !name ||
    !followBtn ||
    !likeBtn ||
    !likeIcon ||
    !likeCountElement
  ) {
    console.error("Required elements not found");
    return;
  }
  const Avatar = avatarFromLocalStorage();
  // Appending details
  commentAvatar.src = Data.author_id.avatar;
  avatar.src = Data.author_id.avatar;
  name.textContent = Data.author_id.name;
  name.classList.add("cursor-pointer");

  // Owner or author functionality
  if (loggedInUser === Data.author_id._id) {
    // Owner
    followBtn.textContent = "Owner";
    followBtn.classList.add(
      "bg-green-500",
      "hover:bg-green-200",
      "active:bg-green-700"
    );

    followBtn.onclick = () => {
      userIdToSession(Data.author_id._id);
      window.location.href = "./Profile.html";
    };

    name.onclick = () => {
      userIdToSession(Data.author_id._id);
      window.location.href = "./Profile.html";
    };
  } else {
    // Not owner
    followBtn.classList.remove(
      "bg-gray-500",
      "hover:bg-gray-200",
      "active:bg-gray-700",
      "bg-blue-500",
      "hover:bg-blue-200",
      "active:bg-blue-700"
    );

    const followDoc = await createFollowDoc(Data.author_id._id);
    if (followDoc.status) {
      followBtn.textContent = "Unfollow";
      followBtn.classList.add(
        "bg-gray-500",
        "hover:bg-gray-200",
        "active:bg-gray-700"
      );
    } else {
      followBtn.textContent = "Follow";
      followBtn.classList.add(
        "bg-blue-500",
        "hover:bg-blue-200",
        "active:bg-blue-700"
      );
    }

    followBtn.onclick = async () => {
      const response = await followReq(followDoc._id);
      if (response.status) {
        followBtn.textContent = "Unfollow";
        followBtn.classList.replace("bg-blue-500", "bg-gray-500");
        followBtn.classList.replace("hover:bg-blue-200", "hover:bg-gray-200");
        followBtn.classList.replace("active:bg-blue-700", "active:bg-gray-700");
      } else {
        followBtn.textContent = "Follow";
        followBtn.classList.replace("bg-gray-500", "bg-blue-500");
        followBtn.classList.replace("hover:bg-gray-200", "hover:bg-blue-200");
        followBtn.classList.replace("active:bg-gray-700", "active:bg-blue-700");
      }
    };

    name.onclick = () => {
      userIdToSession(Data.author_id._id);
      window.location.href = "./Profile.html";
    };
  }

  // Like button logic
  if (loggedInUser) {
    const likeData = await createLikeDoc();
    likeCountElement.textContent = `${likeData.totalLikes} Likes`; // Set initial like count

    const updateLikeButton = () => {
      if (likeData.likeDoc.status) {
        likeIcon.classList.remove("far", "text-gray-500");
        likeIcon.classList.add("fas", "text-red-500"); // Change to filled heart and red color
      } else {
        likeIcon.classList.remove("fas", "text-red-500");
        likeIcon.classList.add("far", "text-gray-500"); // Change to outlined heart and default color
      }
    };

    updateLikeButton();

    likeBtn.addEventListener("click", async () => {
      const res = await likeReq(likeData.likeDoc._id);
      if (res) {
        likeData.likeDoc.status = !likeData.likeDoc.status;
        updateLikeButton();

        // Update the total likes count
        if (likeData.likeDoc.status) {
          likeData.totalLikes += 1;
        } else {
          likeData.totalLikes -= 1;
        }
        likeCountElement.textContent = `${likeData.totalLikes} Likes`; // Update like count display
      }
    });
  } else {
    likeBtn.onclick = () => {
      alert("Please log in to like.");
    };
  }
};
