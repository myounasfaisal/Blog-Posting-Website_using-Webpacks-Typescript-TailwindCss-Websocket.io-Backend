export const getAllBlogsReq = async () => {
  const response = await fetch(`http://localhost:3000/api/v1/blog/get-blogs`);
  if (response.ok) {
    const Data = await response.json();
    console.log("Data", Data);

    const { data } = Data;
    return data;
  }
};
