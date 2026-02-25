import { logger } from "../config/logger.js";
import { groupService } from "../services/group.service.js";
import { groupValidator } from "../validators/group.validator.js";

// \ POST     /groups
// \ GET      /groups
// \ GET      /groups/:groupId
// \ PATCH    /groups/:groupId
// \ DELETE   /groups/:groupId
// \ POST     /groups/:groupId/members
// DELETE   /groups/:groupId/members/:userId

export const createGroup = async (req, res) => {
  try {
    const error = groupValidator.createGroup(req.body);
    if (error) {
      logger.warn(error);
      res.status(400).json({
        success: false,
        error: error,
      });
    }
    console.log(req.body);

    const group = await groupService.createGroup(req.user.userId, req.body);
    logger.info("group created successfully");

    return res.status(201).json({ success: true, data: group });
  } catch (error) {
    logger.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create group",
    });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await groupService.getGroups(req.user.userId);
    res.status(200).json(groups);
  } catch (error) {}
};

export const getGroup = async (req, res) => {
  try {
    const group = await groupService.getGroup(req.user.userId, req.params.groupId);
    res.status(200).json({success: true, group});
  } catch (error) {
    return res.status(error.statusCode || 500).json({success: false, error: error.message})
  }
};

export const patchGroup = async (req, res) => {
  try {
    const result = groupValidator.patchGroup.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, errors: result.error.flatten().fieldErrors });
    }
    const validatedData = result.data;
    const group = await groupService.patchGroup(
      req.user.userId,
      req.params.groupId,
      validatedData,
    );
    res.status(200).json({ success: true, group });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message });
  }
};

export const deleteGroup = async (req, res) => {
try {
  const result = await groupService.deleteGroup(req.user.userId, req.params.groupId);
  return res.status(200).json({success: true, message: "Group deleted successfully"});
} catch (error) {
  return res.status(error.statusCode || 500).json({success: false, error: error.message});
}
}

export const postMembers = async (req, res) => {
  try {
    const result = await groupService.postMembers(req.user.userId, req.params.groupId, req.body);
    res.status(200).json({success: true, result})
  } catch (error) {
    res.status(error.statusCode || 500).json({success: false, error: error.message})
  }
}

export const removeMember = async (req, res) => {
  try {
    const result = await groupService.removeMember(req.user.userId, req.params.userId);
    res.status(200).json({success: true, result})
  } catch (error) {
    res.status(error.statusCode || 500).json({success: false, error: error.message})
  }
}

const groupController = { createGroup };
