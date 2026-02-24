// GET    /users/:id
// PUT    /users/:id
// DELETE /users/:id
import express from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get('/', (req, res)=> {
    res.send('hi');
})

// GET a user by userId
router.get('/:id', authMiddleware.isLoggedIn, userController.getUserById);

// GET a user by email
router.get('/user', authMiddleware.isLoggedIn, userController.getUserByMail);

// UPDATE logged in user
router.patch('/', authMiddleware.isLoggedIn, userController.patchUser);

// DELETE (actually update) logged in user
router.patch('/delete', authMiddleware.isLoggedIn, userController.deleteUser);

export default router;
