import Machine from "../../../modules/machine";
import { Request, Response } from "express";
import { sendResponse, sendError } from "../../common/common";
import Mode from "../../../modules/machine/register/models/mode";
import Product from "../../../modules/machine/inventory/models/product";
export default class AdminController {

    constructor(private vm: Machine) {
    }

    public async getTotalAmount(req: Request, res: Response) {
        try {
            const total = this.vm.getRegister().total;

            return res.send(sendResponse({
                total
            }, false, "Total amount fetched successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error fetching total amount", 500);
            }
        }
    }

    public async getCash(req: Request, res: Response) {
        try {
            const cash = {
                total: this.vm.getRegister().total,
                coins: this.vm.getRegister().getCoins(),
                bills: this.vm.getRegister().getBills()
            }

            return res.send(sendResponse({
                cash
            }, false, "Cash amount fetched successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error fetching cash", 500);
            }
        }
    }


    public async drainRegister(req: Request, res: Response) {
        try {
            this.vm.getRegister().clearRegister();

            return res.send(sendResponse({}, false, "Register drained successfully", 200));
        } catch (err) {

            if (err instanceof Error) {
                return sendError(res, err, "Error draining register", 500);
            }


        }
    }


    public async withdrawCash(req: Request, res: Response) {
        try {
            const { amount } = req.body as { amount: number };

            if (!amount) throw new Error("Amount is required");

            const cash = this.vm.getRegister().widthdraw(amount);

            return res.send(sendResponse({
                cash
            }, false, "Cash withdrawn successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error withdrawing cash", 500);
            }
        }
    }


    public async addCash(req: Request, res: Response) {
        try {
            const { money, type } = req.body as { money: { value: number, count: number }, type: 'coin' | 'bill' };

            if (!money || !type) throw new Error("Money and type are required");

            this.vm.getRegister().addMoney(money, type);

            return res.send(sendResponse({}, false, "Cash added successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error adding cash", 500);
            }
        }
    }


    public async removeCash(req: Request, res: Response) {
        try {
            const { money, type } = req.body as { money: { value: number, count: number }, type: 'coin' | 'bill' };

            if (!money || !type) throw new Error("Money and type are required");

            this.vm.getRegister().removeMoney(money, type);

            return res.send(sendResponse({}, false, "Cash removed successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error removing cash", 500);
            }
        }
    }


    public async getMode(req: Request, res: Response) {
        try {
            const mode = this.vm.getRegister().getMode();

            return res.send(sendResponse({
                mode
            }, false, "Mode fetched successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error fetching mode", 500);
            }
        }
    }


    public async setMode(req: Request, res: Response) {
        try {
            const mode = req.body as Mode;

            if (!mode) throw new Error("Mode is required");

            this.vm.getRegister().setMode(mode);

            return res.send(sendResponse({}, false, "Mode set successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error setting mode", 500);
            }
        }
    }


    public async getProducts(req: Request, res: Response) {
        try {
            const products = this.vm.getInventory().getProducts();

            return res.send(sendResponse({
                products
            }, false, "Products fetched successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error fetching products", 500);
            }
        }
    }


    public async addProduct(req: Request, res: Response) {
        try {
            const product = req.body as Product

            if (!product) throw new Error("Product is required");

            this.vm.getInventory().addProduct(product);

            return res.send(sendResponse({}, false, "Product added successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error adding product", 500);
            }
        }
    }


    public async removeProduct(req: Request, res: Response) {
        try {
            const slot = req.params.slot as unknown as number;

            if (!slot) throw new Error("Slot is required");

            this.vm.getInventory().removeProduct(slot);

            return res.send(sendResponse({}, false, "Product removed successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error removing product", 500);
            }
        }
    }


    public async updateProduct(req: Request, res: Response) {
        try {
            const product = req.body as Product
            const slot = req.params.slot as unknown as number;

            if (!slot || !product) throw new Error("Slot and product are required");

            this.vm.getInventory().updateProduct(slot, product);

            return res.send(sendResponse({}, false, "Product updated successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error updating product", 500);
            }
        }
    }


    public async getProduct(req: Request, res: Response) {
        try {
            const slot = req.params.slot as unknown as number;

            if (!slot) throw new Error("Slot is required");

            const product = this.vm.getInventory().getProduct(slot);

            return res.send(sendResponse({
                product
            }, false, "Product fetched successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error fetching product", 500);
            }
        }
    }

    public async clearInventory(req: Request, res: Response) {
        try {
            this.vm.clearInventory();

            return res.send(sendResponse({}, false, "Inventory cleared successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error clearing inventory", 500);
            }
        }
    }



}