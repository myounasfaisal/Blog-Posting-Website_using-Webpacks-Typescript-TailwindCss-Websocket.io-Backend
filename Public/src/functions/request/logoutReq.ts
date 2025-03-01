import { getTokenFromLocalStorage } from "../../utils/getTokenFromLocalStorage";
import { idFromLocalStorage } from "../../utils/idFromLocalStorage";
import toastr from "toastr"; // Import toastr
import "toastr/build/toastr.min.css";

// Configure toastr options if not done elsewhere
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 3000,
};

export const logoutReq = async () => {
  const id = idFromLocalStorage();
  const Token = getTokenFromLocalStorage();

  if (id && Token) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: Token.AccessToken,
        refreshToken: Token.RefreshToken,
      }),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/logout-user`,
        options
      );

      if (response.ok) {
        // Clear the tokens from local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("userId");

        // Show success message

        // Delay redirection to home page
        setTimeout(() => {
          window.location.href = "/index.html"; // Adjust the path to your login page
        }, 800);
      } else {
        // Show error message
        toastr.error("Logout failed: " + response.statusText);
        console.error("Logout failed: ", response.statusText);
      }
    } catch (error) {
      // Show error message
      toastr.error("An error occurred during logout");
      console.error("Logout failed: ", error);
    }
  } else {
    // Show error message
    toastr.error("No valid ID or Token found in local storage.");
    console.error("No valid ID or Token found in local storage.");
  }
};
