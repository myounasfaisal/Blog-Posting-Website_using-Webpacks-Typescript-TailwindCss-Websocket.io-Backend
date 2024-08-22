import { getTokenFromLocalStorage } from "../../utils/getTokenFromLocalStorage";
import { idFromLocalStorage } from "../../utils/idFromLocalStorage";

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

    const response = await fetch(
      `http://localhost:3000/api/v1/user/logout-user`,
      options
    );

    if (response.ok) {
      // Clear the tokens from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("userId");

      // Redirect to the login page
      window.location.href = "/index.html"; // Adjust the path to your login page
    } else {
      console.error("Logout failed: ", response.statusText);
    }
  } else {
    console.error("No valid ID or Token found in local storage.");
  }
};
