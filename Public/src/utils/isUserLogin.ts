import { idFromLocalStorage } from "./idFromLocalStorage";

export const isUserLogin = () => {
  const id = idFromLocalStorage();
  if (id) {
    return true;
  } else {
    return false;
  }
};
