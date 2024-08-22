import { getUserIdSession } from "../../../utils/getUserIdSession";
import { appendFunction } from "./appendFunction";
import { fetchProfileData } from "./request/fetchProfileData";

export const appendDataToProfilePage = async () => {
  try {
    const id = getUserIdSession();
    if (!id) {
      console.error("ID not found in session storage");
      return;
    }

    console.log("id:", id);

    const Data: any = await fetchProfileData(id);
    if (Data) {
      appendFunction(Data);
    } else {
      console.error("Error while appending data");
    }
  } catch (error) {
    console.error("Error in appendDataToProfilePage:", error);
    alert("ERROR: " + error);
  }
};
