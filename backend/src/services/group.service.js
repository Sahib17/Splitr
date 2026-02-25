import { logger } from "../config/logger.js";
import Expense from "../models/Expense.js";
import Group from "../models/Group.js";
import User from "../models/User.js";

// / POST   /groups
// / GET    /groups
// / GET    /groups/:groupId
// / PUT    /groups/:groupId
// DELETE /groups/:groupId
// POST   /groups/:groupId/members
// DELETE /groups/:groupId/members/:userId

const createGroup = async (userId, body) => {
  console.log(body);

  const members = [...new Set([userId, ...body.members])].map((memberId) => ({
    user: memberId,
  }));
  try {
    const group = await Group.create({
      createdBy: userId,
      name: body.name,
      type: body.type,
      image: body.image,
      members,
    });
    return group;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getGroups = async (userId) => {
  try {
    const groups = await Group.find({ "members.user": userId }).lean();
    return groups;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getGroup = async (userId, groupId) => {
  try {
    const result = await Group.findOne({
      _id: groupId,
      "members.user": userId,
    }).lean();
    if (!result) {
      const error = new Error("Group not found");
      error.statusCode = 404;
      throw error;
    }
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const patchGroup = async (userId, groupId, body) => {
  try {
    const result = await Group.findOneAndUpdate(
      { _id: groupId, "members.user": userId },
      { ...body },
      { returnDocument: "after", runValidators: true },
    );
    if (!result) {
      const error = new Error("Group not found");
      error.statusCode = 404;
      throw error;
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteGroup = async (userId, groupId) => {
  try {
    const result = await Group.findOneAndDelete({
      _id: groupId,
      "members.user": userId,
      members: { $size: 1 },
    });
    if (!result) {
      const error = new Error(
        "Group not found, user not authorized, or group has multiple members",
      );
      error.statusCode = 404;
      throw error;
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const postMembers = async (requesterId, groupId, body) => {
  try {
    const newMember = {
      user: userId,
      amountOwed: 0,
    };
    const result = await Group.findOneAndUpdate(
      {
        _id: groupId,
        "members.user": userId,
        "members.user": { $ne: body.userId },
      },
      {
        $push: { members: newMember },
      },
    );
    if (!result) {
      const error = new Error("Group not found");
      error.statusCode = 404;
      throw error;
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const removeMember = async (userId, groupId, targetId) => {
  try {
    const result = await Group.findOneAndUpdate({
      _id: groupId,
      "members.user": requesterId,
      "members.user": targetId,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const groupService = {
  createGroup,
  getGroups,
  getGroup,
  patchGroup,
  deleteGroup,
  postMembers,
  removeMember,
};
