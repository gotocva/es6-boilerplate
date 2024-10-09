import express from 'express';
import UserController from './UserController';


const userRouter = express.Router();


userRouter.get('/', UserController.listUsers);
userRouter.post('/', UserController.createUser);
userRouter.get('/:id', UserController.getUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;