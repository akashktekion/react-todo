export const getData = async () => {
  //   throw new Error("testing");
  const response = await fetch("http://localhost:5000/todoListsApp");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const putData = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/todoListsApp", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (err) {
    return err;
  }
};
