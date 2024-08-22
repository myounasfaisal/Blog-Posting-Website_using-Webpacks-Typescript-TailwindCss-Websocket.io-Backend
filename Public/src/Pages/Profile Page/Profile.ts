import "../../style.css";
import { appendDataToProfilePage } from "./Functions/appendDataToProfilePage";
document.addEventListener("DOMContentLoaded", async () => {
  await appendDataToProfilePage();
});
