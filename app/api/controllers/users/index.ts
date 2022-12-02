import { Router } from 'express'
import Machine from '../../../modules/machine'
import UserContoller from './user.controller';


export default function userRoutes(vm: Machine) {
    const userRouter = Router();
    const userController = new UserContoller(vm);

    // catalog
    userRouter.get('/products', userController.getProducts.bind(userController));
    userRouter.post('/buy', userController.buyProduct.bind(userController));

    return userRouter;
}