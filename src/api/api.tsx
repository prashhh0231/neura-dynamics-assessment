import axios from "axios";

export const fetchProductsApi = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};
