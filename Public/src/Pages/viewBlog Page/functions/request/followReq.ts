import { getTokenFromLocalStorage } from "../../../../utils/getTokenFromLocalStorage";

export const followReq = async (_id: string) => {
  const token = getTokenFromLocalStorage();
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken: token.AccessToken, followDocId: _id }),
  };

  const response = await fetch(
    `http://localhost:3000/api/v1/follow/toggle-follow
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
