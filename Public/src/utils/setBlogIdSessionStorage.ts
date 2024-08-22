export const setBlogIdSessionStorage = (id: string | null | undefined) => {
  if (!id) {
    return;
  }
  sessionStorage.setItem("blogId", id);
};
