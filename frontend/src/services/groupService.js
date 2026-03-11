import axios from "axios";

export const UserGroups = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/groups`, {withCredentials: true});
  console.log(response.data);
  
  return response.data;
}

export const getGroup = async (groupId) => {
  const group = await axios.get(`${import.meta.env.VITE_API_URL}/groups/${groupId}`, {withCredentials: true});
  const groupExpenses = await axios.get(`${import.meta.env.VITE_API_URL}/groups/${groupId}/expenses`);
  const groupMembers = await axios.get(`${import.meta.env.VITE_API_URL}/groups/${groupId}/members`);
  return ({
    group: group.data, 
    expenses: groupExpenses.data,
    members: groupMembers,
  });
}