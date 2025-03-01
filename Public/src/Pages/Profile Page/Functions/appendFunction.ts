import { createFollowDoc } from "../../../utils/createFollowDocReq";
import { getTokenFromLocalStorage } from "../../../utils/getTokenFromLocalStorage";
import { getUserIdSession } from "../../../utils/getUserIdSession";
import { idFromLocalStorage } from "../../../utils/idFromLocalStorage";
import { followReq } from "./request/followReq";
import { patchProfileData } from "./request/patchProfileData";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

interface ProfileData {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  username: string;
}

export const appendFunction = async (data: ProfileData | null) => {
  if (!data) {
    console.error("Data is missing");
    toastr.error("Data is missing.");
    return;
  }

  const userId = idFromLocalStorage();
  if (!userId) {
    console.log("ID not found in local storage");
  }

  const avatar = document.getElementById(
    "display-avatar"
  ) as HTMLImageElement | null;
  const fullname = document.getElementById(
    "fullname"
  ) as HTMLInputElement | null;
  const email = document.getElementById("email") as HTMLInputElement | null;
  const username = document.getElementById(
    "username"
  ) as HTMLInputElement | null;
  const avatarInput = document.getElementById(
    "get-avatar"
  ) as HTMLInputElement | null;
  const updateBtn = document.getElementById(
    "update-btn"
  ) as HTMLButtonElement | null;

  if (avatar) avatar.src = data.avatar;
  if (fullname) fullname.value = data.name;
  if (email) email.value = data.email;
  if (username) username.value = data.username;

  const checkData = {
    avatar: avatar?.src,
    name: fullname?.value,
    email: email?.value,
    username: username?.value,
  };

  if (userId !== data._id || !userId) {
    if (fullname) fullname.readOnly = true;
    if (email) email.readOnly = true;
    if (username) username.readOnly = true;

    const imageInput = document.getElementById("get-avatar");
    imageInput?.remove();

    const followButton = document.getElementById(
      "update-btn"
    ) as HTMLButtonElement | null;
    if (followButton) {
      followButton.id = "follow-btn";
      followButton.textContent = "Follow";
      followButton.classList.remove(
        "bg-green-500",
        "hover:bg-green-200",
        "active:bg-green-700"
      );
      followButton.classList.add(
        "bg-blue-500",
        "hover:bg-blue-200",
        "active:bg-blue-700"
      );

      const following_id = data._id;

      if (userId) {
        // User is logged in
        const followDoc = await createFollowDoc(following_id);

        if (followDoc.status) {
          followButton.textContent = "Unfollow";
          followButton.classList.replace("bg-blue-500", "bg-gray-500");
          followButton.classList.replace(
            "hover:bg-blue-200",
            "hover:bg-gray-200"
          );
          followButton.classList.replace(
            "active:bg-blue-700",
            "active:bg-gray-700"
          );
          toastr.success("Following successfully!");
        }

        followButton.addEventListener("click", async () => {
          const data = await followReq(followDoc?._id);
          if (data.status) {
            followButton.textContent = "Unfollow";
            followButton.classList.replace("bg-blue-500", "bg-gray-500");
            followButton.classList.replace(
              "hover:bg-blue-200",
              "hover:bg-gray-200"
            );
            followButton.classList.replace(
              "active:bg-blue-700",
              "active:bg-gray-700"
            );
            toastr.success("Now following user!");
          } else if (!data.status) {
            followButton.textContent = "Follow";
            followButton.classList.replace("bg-gray-500", "bg-blue-500");
            followButton.classList.replace(
              "hover:bg-gray-200",
              "hover:bg-blue-200"
            );
            followButton.classList.replace(
              "active:bg-gray-700",
              "active:bg-blue-700"
            );
            toastr.success("User unfollowed");
          }
        });
      } else {
        // User is not logged in
        followButton.addEventListener("click", () => {
          toastr.warning("Please log in to follow.");
        });
      }
    }
  } else {
    if (updateBtn) {
      updateBtn.textContent = "Update Details";
      updateBtn.classList.add(
        "bg-blue-500",
        "hover:bg-blue-200",
        "active:bg-blue-700"
      );
      updateBtn.classList.remove(
        "bg-green-500",
        "hover:bg-green-200",
        "active:bg-green-700"
      );

      updateBtn.addEventListener("click", async () => {
        // Prepare the updated data
        const updatedData = {
          avatar: avatar?.src || "",
          name: fullname?.value || "",
          email: email?.value || "",
          username: username?.value || "",
        };

        let hasChanges = false;

        // Compare current and updated data
        if (
          updatedData.avatar !== checkData.avatar ||
          updatedData.name !== checkData.name ||
          updatedData.email !== checkData.email ||
          updatedData.username !== checkData.username
        ) {
          hasChanges = true;
        }

        if (hasChanges) {
          try {
            const formData = new FormData();
            const Token = getTokenFromLocalStorage();
            // Add updated fields to FormData
            formData.append(
              "accessToken",
              Token?.AccessToken ? Token.AccessToken : ""
            );
            formData.append("name", updatedData.name);
            formData.append("email", updatedData.email);
            formData.append("username", updatedData.username);

            if (avatarInput?.files?.length) {
              formData.append("avatar", avatarInput.files[0]);
            }

            await patchProfileData(formData);
            toastr.success("Profile updated successfully.");
          } catch (error) {
            console.error("Failed to update profile data:", error);
            toastr.error("Failed to update profile data.");
          }
        } else {
          console.log("No changes detected.");
          toastr.info("No changes detected.");
        }
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const avatarInput = document.getElementById("get-avatar") as HTMLInputElement;
  const avatarElem = document.getElementById(
    "display-avatar"
  ) as HTMLImageElement;

  if (!avatarInput || !avatarElem) {
    console.error("Required elements not found");
    toastr.error("Required elements for avatar not found.");
    return;
  }

  avatarInput.addEventListener("input", () => {
    console.log("Change event triggered");
    if (avatarInput.files && avatarInput.files.length > 0) {
      const file = avatarInput.files[0];
      const objectURL = URL.createObjectURL(file);
      console.log("File selected: ", file);
      console.log("Object URL: ", objectURL);
      avatarElem.src = objectURL;
      toastr.info("Avatar image selected.");
      setTimeout(() => URL.revokeObjectURL(objectURL), 10000);
    } else {
      console.log("No file selected");
    }
  });
});
