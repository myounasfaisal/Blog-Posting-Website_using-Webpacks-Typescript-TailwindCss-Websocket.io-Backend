import { avatarFromLocalStorage } from "../../../utils/avatarFromLocalStorage";
import { createFollowDoc } from "../../../utils/createFollowDocReq";
import { createLikeDoc } from "../../../utils/createLikeDocReq";
import { idFromLocalStorage } from "../../../utils/idFromLocalStorage";
import { userIdToSession } from "../../../utils/userIdToSession";
import { followReq } from "./request/followReq";
import { likeReq } from "./request/likeReq";
import toastr from "toastr";
import "toastr/build/toastr.min.css"; // Ensure CSS is correctly handled by Webpack

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
    !likeCountElement ||
    !commentAvatar
  ) {
    console.error("Required elements not found");
    return;
  }

  const Avatar = avatarFromLocalStorage();
  commentAvatar.src = Avatar
    ? Avatar
    : "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
  avatar.src = Data.author_id.avatar;
  name.textContent = Data.author_id.name;
  name.classList.add("cursor-pointer");

  // Owner or author functionality
  if (loggedInUser === Data.author_id._id) {
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
    followBtn.classList.remove(
      "bg-gray-500",
      "hover:bg-gray-200",
      "active:bg-gray-700",
      "bg-blue-500",
      "hover:bg-blue-200",
      "active:bg-blue-700"
    );

    if (loggedInUser) {
      const followDoc = await createFollowDoc(Data.author_id._id);
      if (followDoc && followDoc.status) {
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
        const response = await followReq(followDoc?._id);
        if (response && response.status) {
          followBtn.textContent = "Unfollow";
          followBtn.classList.replace("bg-blue-500", "bg-gray-500");
          followBtn.classList.replace("hover:bg-blue-200", "hover:bg-gray-200");
          toastr.success("You are now following this user!", "Follow");
        } else {
          followBtn.textContent = "Follow";
          followBtn.classList.replace("bg-gray-500", "bg-blue-500");
          followBtn.classList.replace("hover:bg-gray-200", "hover:bg-blue-200");
          toastr.info("You have unfollowed this user.", "Unfollow");
        }
      };
    } else {
      followBtn.textContent = "Follow";
      followBtn.classList.add(
        "bg-blue-500",
        "hover:bg-blue-200",
        "active:bg-blue-700"
      );
      followBtn.onclick = () => {
        toastr.warning("Please log in to follow users.", "Login Required");
      };
    }

    name.onclick = () => {
      userIdToSession(Data.author_id._id);
      window.location.href = "./Profile.html";
    };
  }

  // Like button logic
  if (loggedInUser) {
    try {
      const likeData = await createLikeDoc();

      if (likeData && likeData.likeDoc) {
        // Set initial like count
        likeCountElement.textContent = `${likeData.totalLikes} Likes`;

        const updateLikeButton = () => {
          if (likeData.likeDoc.status) {
            likeIcon.classList.remove("far", "text-gray-500");
            likeIcon.classList.add("fas", "text-red-500");
          } else {
            likeIcon.classList.remove("fas", "text-red-500");
            likeIcon.classList.add("far", "text-gray-500");
          }
        };

        updateLikeButton();

        likeBtn.addEventListener("click", async () => {
          try {
            const res = await likeReq(likeData.likeDoc._id);
            if (res) {
              likeData.likeDoc.status = !likeData.likeDoc.status; // Toggle the status
              updateLikeButton();

              // Update the total likes count
              if (res.status) {
                likeData.totalLikes += 1;
              } else {
                likeData.totalLikes -= 1;
              }
              likeCountElement.textContent = `${likeData.totalLikes} Likes`;
              toastr.success("Your like status has been updated!", "Like");
            } else {
              toastr.error("Failed to update like status.", "Error");
            }
          } catch (err) {
            console.error("Error updating like status:", err);
            toastr.error("An error occurred while updating like status.");
          }
        });
      } else {
        console.error("Like data or like document is undefined.");
        toastr.error("Unable to retrieve like status.");
      }
    } catch (err) {
      console.error("Error fetching like data:", err);
      toastr.error("An error occurred while fetching like data.");
    }
  } else {
    likeBtn.onclick = () => {
      toastr.warning("Please log in to like.", "Login Required");
    };
  }
};
