import { Router } from 'express'
import Machine from '../../../modules/machine'
import AdminController from './admin.controller'


export default function adminRoutes(vm: Machine) {
    const adminRouter = Router();
    const adminController = new AdminController(vm);

    adminRouter.get('/total', adminController.getTotalAmount.bind(adminController));
    adminRouter.get('/cash', adminController.getCash.bind(adminController));

    return adminRouter;
}