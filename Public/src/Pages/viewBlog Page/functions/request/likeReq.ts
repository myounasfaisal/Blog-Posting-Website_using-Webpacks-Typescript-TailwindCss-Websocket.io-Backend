import { getTokenFromLocalStorage } from "../../../../utils/getTokenFromLocalStorage";

export const likeReq = async (_id: string) => {
  const token = getTokenFromLocalStorage();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken: token.AccessToken, likeDocId: _id }),
  };

  const response = await fetch(
    `http://localhost:3000/api/v1/like/toggle-like
      `,
    options
  );

  if (response.ok) {
    const result = await response.json();
    console.log(result);
    const { data } = await result;
    return data;
  }
};
