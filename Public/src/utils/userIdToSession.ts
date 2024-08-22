export const userIdToSession = (id: string | null | undefined) => {
  if (id) {
    sessionStorage.setItem("userId", id);
  }
};
