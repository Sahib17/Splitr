// POST   /groups
// GET    /groups
// GET    /groups/:groupId
// PUT    /groups/:groupId
// DELETE /groups/:groupId
// POST   /groups/:groupId/members
// DELETE /groups/:groupId/members/:userId

import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { createGroup, deleteGroup, getGroup, getGroups, patchGroup, postMembers, removeMember } from "../controllers/group.controller.js";
const router = express.Router();

router.post('/', isLoggedIn, createGroup);

router.get('/', isLoggedIn, getGroups);

router.get('/:groupId', isLoggedIn, getGroup);

router.patch('/:groupId', isLoggedIn, patchGroup);

router.delete('/:groupId', isLoggedIn, deleteGroup);

router.post('/:groupId/members', isLoggedIn, postMembers);

router.patch('/:groupId/members/:userId', isLoggedIn, removeMember);

export default router;