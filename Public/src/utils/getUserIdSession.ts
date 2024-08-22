export const getUserIdSession = () => {
  const id = sessionStorage.getItem("userId");
  return id;
};
