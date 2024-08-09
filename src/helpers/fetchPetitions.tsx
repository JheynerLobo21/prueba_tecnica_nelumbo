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

export const getProducts = async (category:number, minPrice:number|null, maxPrice:number|null) => {
  try {
    let url = `https://api.escuelajs.co/api/v1/products/?categoryId=${category}`;

    if (minPrice !== null && maxPrice !== null && minPrice<maxPrice) {
      url += `&price_min=${minPrice}&price_max=${maxPrice}`;
    }

    const petition = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (petition.status !== 204) {
      return await petition.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
