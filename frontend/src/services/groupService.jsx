import axios from "axios";

export const UserGroups = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/groups`, {withCredentials: true});
  console.log(response.data);
  
  return response.data;
}
