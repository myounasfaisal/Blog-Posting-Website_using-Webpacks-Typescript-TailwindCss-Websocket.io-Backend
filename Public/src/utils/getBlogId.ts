export const getBlogId = (): string | null => {
  const blogId = sessionStorage.getItem("blogId");
  return blogId;
};
