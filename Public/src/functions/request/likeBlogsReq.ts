import { getTokenFromLocalStorage } from "../../utils/getTokenFromLocalStorage";

export const likeBlogsReq = async () => {
  try {
    const token = getTokenFromLocalStorage();

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.AccessToken}`,
      },
    };

    const response = await fetch(
      `http://localhost:3000/api/v1/like/getUserLikesStatus`,
      options
    );

    if (response.ok) {
      const result = await response.json();
      console.log("Liked Blogs: ", result);
      return result.data; // Assuming `data` contains the list of liked blogs
    } else {
      console.error("Failed to fetch liked blogs");
      return null;
    }
  } catch (error) {
    console.error("Error fetching liked blogs: ", error);
    return null;
  }
};
