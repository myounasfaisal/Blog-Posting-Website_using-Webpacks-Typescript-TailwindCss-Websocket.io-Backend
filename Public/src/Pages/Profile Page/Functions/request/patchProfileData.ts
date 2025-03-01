import { getTokenFromLocalStorage } from "../../../../utils/getTokenFromLocalStorage";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
export const patchProfileData = async (formData: FormData) => {
  const token = getTokenFromLocalStorage();

  // Check if the token is available
  if (!token?.AccessToken) {
    throw new Error("Access token is missing");
  }

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.AccessToken}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/user/updateProfile",
      options
    );

    if (!response.ok) {
      toastr.error("Failed To Update the Profile");
    }

    const result = await response.json();
    console.log("Response:", result);

    const { data } = result;
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
