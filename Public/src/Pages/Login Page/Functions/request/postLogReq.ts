import { avatarToLocalStorage } from "../../../../utils/avatarToLocalStorage";
import { idToLocalStorage } from "../../../../utils/idToLocalStorage";
import { setTokenToLocalStorage } from "../../../../utils/setTokenToLocalStorage";
import { getFormData } from "../../utils/getFormData";

export const postLogReq = async (): Promise<any | null> => {
  try {
    const formData: any = getFormData();

    if (formData) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        }),
      };

      const response = await fetch(
        `http://localhost:3000/api/v1/user/login-user`,
        options
      );

      if (response.ok) {
        const Data = await response.json();
        const { data } = Data;
        setTokenToLocalStorage(data.accessToken, data.refreshToken);
        idToLocalStorage(data._id);
        avatarToLocalStorage(data.avatar);

        return data;
      } else {
        console.error("Error:", response.statusText);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    }
    return null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
