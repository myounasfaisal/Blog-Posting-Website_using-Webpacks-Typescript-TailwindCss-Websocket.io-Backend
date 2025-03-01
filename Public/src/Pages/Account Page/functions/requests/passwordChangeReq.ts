import { getTokenFromLocalStorage } from "../../../../utils/getTokenFromLocalStorage";
import { getFormData } from "../../utils/getFormData";
import toastr from "toastr"; // Import toastr
import "toastr/build/toastr.min.css"; // Import toastr CSS

export const handleUpdatePassword = async (): Promise<void> => {
  const { currentPassword, newPassword, confirmPassword } = getFormData();

  if (newPassword !== confirmPassword) {
    toastr.error(
      "New password and confirm password do not match.",
      "Password Error"
    );
    return;
  }

  const token = getTokenFromLocalStorage();

  if (!token?.AccessToken) {
    toastr.error(
      "User is not authenticated. Please log in.",
      "Authentication Error"
    );
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/user/update-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.AccessToken}`, // Send token in headers
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      }
    );

    if (response.ok) {
      toastr.success("Password updated successfully!", "Success");
    } else {
      const errorData = await response.json();
      toastr.error(
        `Failed to update password: ${errorData.status}`,
        "Update Error"
      );
    }
  } catch (error) {
    console.error("Error updating password:", error);
    toastr.error("An error occurred. Please try again.", "Error");
  }
};
