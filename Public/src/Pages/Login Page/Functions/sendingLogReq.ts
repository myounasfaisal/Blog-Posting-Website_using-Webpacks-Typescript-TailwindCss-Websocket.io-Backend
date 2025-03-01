import { postLogReq } from "./request/postLogReq";
import toastr from "toastr"; // Import toastr

// Ensure toastr CSS is imported if not already
import "toastr/build/toastr.min.css";

export const sendingLogReq = async () => {
  try {
    const response = await postLogReq();

    if (response) {
      console.log("Success");
      toastr.success("User Logged In Successfully");
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 800);
    } else {
      console.log("Error");
      toastr.error("User Log In Failed");
    }
  } catch (error) {
    console.error("Error:", error);
    toastr.error("An unexpected error occurred");
  }
};
