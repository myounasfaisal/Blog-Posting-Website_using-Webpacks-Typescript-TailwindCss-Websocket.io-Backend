import { postLogReq } from "./request/postLogReq";

export const sendingLogReq = async () => {
  const response = await postLogReq();

  console.log("check", response);

  if (response) {
    console.log("Success");
    alert("User Logged In Successfully");
    window.location.href = "./index.html";
  } else {
    console.log("Error");
    alert("User Log In Failed");
  }
};
