import {
  getTokenFromLocalStorage,
  Token,
} from "../../../../utils/getTokenFromLocalStorage";
import { idFromLocalStorage } from "../../../../utils/idFromLocalStorage";
import { setBlogIdSessionStorage } from "../../../../utils/setBlogIdSessionStorage";
export const postBlogReq = async (
  content: object | null | undefined
): Promise<any> => {
  if (!content) {
    console.error("Blog Content Empty || not defined");
    console.log(content);
  } else {
    const author_id = idFromLocalStorage();
    const { AccessToken, RefreshToken }: Token = getTokenFromLocalStorage();

    console.log("cont ", content);

    const data = {
      blog: {
        ...content,
      },
      author_id,
      accessToken: AccessToken,
      refreshToken: RefreshToken,
    };

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/blog/post-blog`,
        options
      );

      if (response.ok) {
        const Data = await response.json();
        console.log("Data : ", Data);
        const { data } = Data;
        setBlogIdSessionStorage(data._id);
      } else {
        console.error("Failed to post blog:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      return null;
    }
  }
};
