import { getBlogId } from "./getBlogId";
import { getTokenFromLocalStorage } from "./getTokenFromLocalStorage";

export const createLikeDoc = async () => {
  const Token = getTokenFromLocalStorage();
  const likedBlog = getBlogId();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likedBlog, accessToken: Token?.AccessToken }),
  };

  const response = await fetch(
    `http://localhost:3000/api/v1/like/like
      `,
    options
  );

  if (response.ok) {
    const result = await response.json();

    console.log("Res : ", result);

    const { data } = result;

    return data;
  }
};
