import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateUser);

export const UserRouter = router;
