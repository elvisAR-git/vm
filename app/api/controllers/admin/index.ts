import { Router } from 'express'
import Machine from '../../../modules/machine'
import AdminController from './admin.controller'


export default function adminRoutes(vm: Machine) {
    const adminRouter = Router();
    const adminController = new AdminController(vm);

    // register
    adminRouter.get('/register/total', adminController.getTotalAmount.bind(adminController));
    adminRouter.get('/register/cash', adminController.getCash.bind(adminController));
    adminRouter.get('/register/drain', adminController.drainRegister.bind(adminController));
    adminRouter.post('/register/withdraw', adminController.withdrawCash.bind(adminController));
    adminRouter.post('/register/addCash', adminController.addCash.bind(adminController));
    adminRouter.post('/register/removeCash', adminController.removeCash.bind(adminController));

    adminRouter.post('/register/setMode', adminController.setMode.bind(adminController));
    adminRouter.get('/register/getMode', adminController.getMode.bind(adminController));

    // inventory
    adminRouter.post('/products', adminController.addProduct.bind(adminController));
    adminRouter.delete('/products/:slot', adminController.removeProduct.bind(adminController));
    adminRouter.patch('/products/:slot', adminController.updateProduct.bind(adminController));
    adminRouter.get('/products/:slot', adminController.getProduct.bind(adminController));
    adminRouter.get('/products', adminController.getProducts.bind(adminController));
    adminRouter.post('/clearInventory', adminController.clearInventory.bind(adminController));

    return adminRouter;
}