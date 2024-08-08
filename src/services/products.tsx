export const getCategories = async () => {
  try {
    const petition = await fetch("https://api.escuelajs.co/api/v1/categories", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (petition.status != 204) return await petition.json();
    else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getProducts = async () => {
  try {
    const petition = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (petition.status != 204) return await petition.json();
    else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};
