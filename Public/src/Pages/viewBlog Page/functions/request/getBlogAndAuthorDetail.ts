export const getBlogAndAuthorDetail = async (id: string | null | undefined) => {
  if (id) {
    const response = await fetch(
      `http://localhost:3000/api/v1/blog/get-blog/${id}`
    );
    if (response.ok) {
      const Data = await response.json();

      const { data } = Data;

      return data;
    }
  }
};
