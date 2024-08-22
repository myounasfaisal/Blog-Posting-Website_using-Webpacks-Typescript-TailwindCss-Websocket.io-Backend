import { isUserLogin } from "../utils/isUserLogin";
import { appendBlogDocs } from "./appendBlogDocs";
import { getAllBlogsReq } from "./request/getAllBlogsReq";
import { likeBlogsReq } from "./request/likeBlogsReq";

export const sendingReqAndAppending = async () => {
  const blogs = await getAllBlogsReq();
  let likedBlogs = [];

  if (isUserLogin()) {
    likedBlogs = await likeBlogsReq();
  }

  blogs.forEach((element: any) => {
    const likeVal = likedBlogs.some(
      (likedBlog: any) => likedBlog.likedBlog._id === element._id
    );
    appendBlogDocs(element, likeVal);
  });
};
