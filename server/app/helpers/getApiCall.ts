import axios from "axios";

export const getApiCall = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
