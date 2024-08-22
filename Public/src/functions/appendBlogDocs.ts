import { setBlogIdSessionStorage } from "../utils/setBlogIdSessionStorage";
import { userIdToSession } from "../utils/userIdToSession";

let id = 1;

export const appendBlogDocs = (data: any, likeVal: boolean | null) => {
  const blogList = document.getElementById("blog-list") as HTMLElement;

  const blog = document.createElement("li");
  blog.innerHTML = `
    <div id="image-name-container-${data.author_id._id}-${id}" class="cursor-pointer flex gap-1">
      <div id="image-container" class="overflow-hidden rounded-full h-8 w-8">
        <img
          class="h-full w-full object-cover"
          id="image-${data.author_id._id}"
          src="${data.author_id.avatar}"
        />
      </div>
      <div class="flex flex-col mb-2" id="name-date-container">
        <span class="font-semibold text-sm text-[#404040]">${data.author_id.name}</span>
        <span class="text-xs font-extralight text-gray-700" id="date">${new Date(data.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
    <div id="blog-${data._id}-${id}">
      <h2 id="title" class="text-xl font-bold">${data.blog.title}</h2>
      <div id="tags" class="flex flex-wrap gap-x-4 gap-y-1 py-2">
        <!-- Add tags here if available -->
      </div>
      <div id="buttons" class="flex mt-3 justify-evenly items-center">
        ${
          likeVal !== null
            ? `
        <button class="like-button text-gray-500">
          <i id="like-icon-${data._id}-${id}" class="${likeVal ? "fas" : "far"} fa-heart"></i>
        </button>
        `
            : ""
        }
        <span class="text-xs text-gray-700" id="like-count">${data.likesCount} Likes</span>
        <span class="text-xs text-gray-700" id="comments-count">${data.commentsCount} Comments</span>
        <button class="comment-button text-gray-500">
          <i class="far fa-comment"></i>
        </button>
      </div>
    </div>
  `;

  blog.classList.add(
    "bg-slate-50",
    "rounded-md",
    "border",
    "px-4",
    "py-2",
    "flex",
    "flex-col",
    "justify-center",
    "w-[100%]"
  );

  blogList.appendChild(blog);

  // Event Listeners
  document
    .getElementById(`image-name-container-${data.author_id._id}-${id}`)
    ?.addEventListener("click", () => {
      userIdToSession(data.author_id._id);
      window.location.href = "Profile.html";
    });

  document
    .getElementById(`blog-${data._id}-${id}`)
    ?.addEventListener("click", () => {
      setBlogIdSessionStorage(data._id);
      window.location.href = "viewBlog.html";
    });

  id++;
};
