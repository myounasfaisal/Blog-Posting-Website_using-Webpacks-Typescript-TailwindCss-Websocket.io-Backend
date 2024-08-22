import { getTokenFromLocalStorage } from "../../../../utils/getTokenFromLocalStorage";
export const patchCommentReq = async (commentId: any, comment: string) => {
  const token = getTokenFromLocalStorage();

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId,
      comment,
      accessToken: token.AccessToken,
      refreshToken: token.RefreshToken,
    }),
  };

  const response = await fetch(
    `http://localhost:3000/api/v1/comment/edit-comment`,
    options
  );

  if (response.ok) {
    const Data = await response.json();
    console.log("Edited Comment Response : ", Data);
    const { data } = Data;
    return data;
  }
};
