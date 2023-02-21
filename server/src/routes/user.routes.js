import express from 'express';
import userController from '../controllers/user.controller.js';

const userRoutes = express.Router();

userRoutes.route('/').get(userController.getAllUsers).post(userController.createUser);
userRoutes.route('/:id').get(userController.getUserInfoById);

export default userRoutes;
