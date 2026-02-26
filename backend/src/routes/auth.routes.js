// POST   /auth/register
// POST   /auth/login
// POST   /auth/logout
// GET    /auth/me

import express from "express";
import { authController } from "../controllers/auth.controller.js";
const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/me', authController.me);

router.post('/sendMail', authController.sendMail)

export default router;

function aFunction(){

}