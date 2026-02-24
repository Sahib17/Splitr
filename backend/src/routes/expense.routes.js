// POST   /expenses
// GET    /expenses
// GET    /expenses/:expenseId
// PUT    /expenses/:expenseId
// DELETE /expenses/:expenseId
// POST   /expenses/:expenseId/comments

import express from "express";
const router = express.Router();

router.post('/', aFunction);

router.get('/', aFunction);

router.get('/:expenseId', aFunction);

router.patch('/:expenseId', aFunction);

router.delete('/:expenseId', aFunction);

router.post('/:expenseId', aFunction);

export default router;

function aFunction(){

}