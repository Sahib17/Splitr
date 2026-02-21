const createGroup = (body) => {
  const { name, type, members } = body;

  if (!name || !type) return "Name and type are required";

  if (!Array.isArray(members)) return "Members must be an array";

  if (members.length < 1) return "At least one member required";

  if (type === "FRIEND" && members.length !== 1)
    return "FRIEND must have exactly one member";

  const uniqueMembers = new Set(members);

  if (uniqueMembers.size !== members.length)
    return "Duplicate members not allowed";

  return null;
};


export const groupValidator = {
    createGroup,
}