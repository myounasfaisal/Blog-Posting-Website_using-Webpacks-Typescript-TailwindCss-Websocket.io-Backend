import { idFromLocalStorage } from "../../../utils/idFromLocalStorage";
import { isAuthor } from "../../../utils/isAuthor";
import { isUserLogin } from "../../../utils/isUserLogin";
import { patchCommentReq } from "../functions/request/patchCommentReq";
import toastr from "toastr";
import { userIdToSession } from "../../../utils/userIdToSession";

export const appendComment = (Data: any) => {
  const userId = idFromLocalStorage();
  const isCommentAuthor = isAuthor(Data.user_id._id, userId);

  const div = document.createElement("div") as HTMLElement;

  div.innerHTML = `
    <hr class="w-[80%]">
    <div id="image-name-container-${Data._id}" class="cursor-pointer flex gap-1">
      <div id="image-container-${Data._id}" class="overflow-hidden rounded-full h-8 w-8">
        <img
          class="h-full w-full object-cover rounded-full"
          id="image-${Data._id}"
          src="${Data.user_id.avatar}"
          alt="${Data.user_id.username}'s avatar"
        >
      </div>
      <div class="flex flex-col mb-2" id="name-date-container">
        <span
          class="font-semibold text-sm text-[#404040] cursor-pointer"
          id="username-${Data._id}"
        >
          ${Data.user_id.username}
        </span>
        <span class="text-xs font-extralight text-gray-700" id="date">${new Date(Data.createdAt).toLocaleDateString()}</span>
      </div>
    </div>

    <div id="comment-value" class="w-full h-40">
      <textarea
        name="comment"
        id="user-comment-value-${Data._id}"
        rows="5"
        class="w-[80%] px-2 py-1 border outline-blue-400"
        ${!isCommentAuthor ? "readonly" : ""}
      >${Data.comment}</textarea>
    </div>
  `;

  div.id = `comment-${Data._id}`;
  div.classList.add("flex", "flex-col", "gap-2", "mt-2", "w-full");

  document.getElementById("comment-list")?.appendChild(div);

  if (isCommentAuthor) {
    const editComment = document.getElementById(
      `user-comment-value-${Data._id}`
    ) as HTMLTextAreaElement;
    let originalComment = editComment?.value?.trim();

    // Adding an event listener for when the user finishes editing the comment
    editComment?.addEventListener("change", async () => {
      const updatedComment = editComment?.value?.trim();
      if (originalComment !== updatedComment && updatedComment) {
        const { comment } = await patchCommentReq(Data._id, updatedComment);
        originalComment = comment;
        toastr.success("Comment edited successfully!");
      }
    });
  }

  // Event Listeners for profile redirection

  document
    .getElementById(`username-${Data._id}`)
    ?.addEventListener("click", () => {
      userIdToSession(Data.user_id._id);
      window.location.href = "Profile.html";
    });
};
