// POST   /groups
// GET    /groups
// GET    /groups/:groupId
// PUT    /groups/:groupId
// DELETE /groups/:groupId
// POST   /groups/:groupId/members
// DELETE /groups/:groupId/members/:userId

import express from "express";
const router = express.Router();

router.post('/', aFunction);

router.get('/', aFunction);

router.get('/:groupId', aFunction);

router.put('/:groupId', aFunction);

router.delete('/:groupId', aFunction);

router.post('/:groupId/members', aFunction);

router.delete('/:groupId/members/:userId', aFunction);

export default router;

function aFunction(){

}
