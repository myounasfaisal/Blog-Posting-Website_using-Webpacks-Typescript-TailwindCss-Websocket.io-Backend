export const fetchProfileData = async (id: string): Promise<any | null> => {
  if (!id) {
    console.error("ID not found");
    return null;
  }

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/user/get-userdetails/${id}`,
      options
    );

    if (response.ok) {
      const Data = await response.json();
      console.log("response:", response);
      const { data } = Data;
      return data;
    } else {
      console.error("Failed to fetch profile data:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
};
