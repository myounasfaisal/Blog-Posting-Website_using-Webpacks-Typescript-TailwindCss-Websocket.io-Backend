import { getTokenFromLocalStorage } from "./getTokenFromLocalStorage";

export const createFollowDoc = async (following_id: string) => {
  const Token = getTokenFromLocalStorage();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ following_id, accessToken: Token?.AccessToken }),
  };

  const response = await fetch(
    `http://localhost:3000/api/v1/follow/create-follow
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
