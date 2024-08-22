import { getBlogId } from "../../../../utils/getBlogId";
import { getTokenFromLocalStorage } from "../../../../utils/getTokenFromLocalStorage";
export const commentReq = async (comment: string) => {
  const id = getBlogId();

  const Token = getTokenFromLocalStorage();

  if (id && Token) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: Token.AccessToken,
        comment: comment,
        blog_id: id,
      }),
    };

    const response = await fetch(
      `http://localhost:3000/api/v1/comment/create-comment`,
      options
    );

    if (response.ok) {
      const Data = await response.json();
      console.log(Data);
      const { data } = Data;
      return data;
    }
  }
};
