import { clearInputFieldsReg } from "../utils/clearInputFieldsReg";
import { regPostRequest } from "./request/regPostRequest";

export const sendingRegReq = async () => {
  const response = await regPostRequest();

  if (response) {
    console.log("Success");

    clearInputFieldsReg();
  } else {
    alert("Registration Failed");
  }
};
