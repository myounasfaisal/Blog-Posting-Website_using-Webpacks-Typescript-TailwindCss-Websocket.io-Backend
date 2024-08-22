import { getBlogId } from "../../../../utils/getBlogId";

export const getCommentsReq = async () => {
  const blogId = getBlogId();
  const response = await fetch(
    `http://localhost:3000/api/v1/comment/get-comments/${blogId}`
  );

  if (response.ok) {
    const Data = await response.json();
    console.log("Comments : ", Data);
    return Data.data;
  }
};
