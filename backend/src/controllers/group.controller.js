import { logger } from "../config/logger.js";
import { groupService } from "../services/group.service.js";
import { groupValidator } from "../validators/group.validator.js";

// POST   /groups
// GET    /groups
// GET    /groups/:groupId
// PUT    /groups/:groupId
// DELETE /groups/:groupId
// POST   /groups/:groupId/members
// DELETE /groups/:groupId/members/:userId

const createGroup = async (req, res) => {
  try {
    const error = groupValidator.createGroup(req.body);
    if (error) {
      logger.warn(error);
      res.status(400).json({
        success: false,
        error: error,
      });
    }
    const group = await groupService.createGroup(req.user.id, req.body);
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

const groupController = {createGroup}