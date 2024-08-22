import { getFormData } from "../../utils/getFormData";

export const regPostRequest = async () => {
  try {
    const formData = getFormData();
    if (!formData) {
      return;
    }

    const options = {
      method: "POST",

      body: formData,
    };

    const response = await fetch(
      `http://localhost:3000/api/v1/user/register-user`,
      options
    );
    if (response.ok) {
      const data = await response.json();

      console.log(" data : ", data);

      return data;
    } else {
      console.log("error : ", response.status);
      return null;
    }
  } catch (error) {
    console.log(" Error:", error);
  }
};
