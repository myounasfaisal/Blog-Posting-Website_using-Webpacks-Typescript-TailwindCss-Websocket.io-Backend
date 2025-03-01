import {
  getTokenFromLocalStorage,
  Token,
} from "../../../../utils/getTokenFromLocalStorage";
import { idFromLocalStorage } from "../../../../utils/idFromLocalStorage";
import { setBlogIdSessionStorage } from "../../../../utils/setBlogIdSessionStorage";
import toastr from "toastr"; // Import toastr
import "toastr/build/toastr.min.css"; // Import toastr CSS

export const postBlogReq = async (
  content: object | null | undefined
): Promise<any> => {
  if (!content) {
    toastr.error("Blog content is empty or not defined.", "Content Error");
    console.error("Blog Content Empty || not defined");
    return;
  } else {
    const author_id = idFromLocalStorage();
    const { AccessToken, RefreshToken }: Token = getTokenFromLocalStorage();

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
        const { data } = Data;
        setBlogIdSessionStorage(data._id);
        toastr.success("Blog posted successfully!", "Success");
      } else {
        const errorMessage = response.statusText || "Unknown error occurred";
        toastr.error(`Failed to post blog: ${errorMessage}`, "Post Error");
        console.error("Failed to post blog:", errorMessage);
        return null;
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      toastr.error("An error occurred while posting the blog.", "Error");
      return null;
    }
  }
};
