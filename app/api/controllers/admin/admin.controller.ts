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

            return sendResponse(res, {
                total
            }, false, "Total amount fetched successfully", 200);
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

            return sendResponse(res, cash, false, "Cash fetched successfully", 200);
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error fetching cash", 500);
            }
        }
    }


    public async drainRegister(req: Request, res: Response) {
        try {
            this.vm.getRegister().clearRegister();

            return sendResponse(res, {}, false, "Register drained successfully", 200);
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

            return sendResponse(res, cash, false, "Cash withdrawn successfully", 200);
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error withdrawing cash", 500);
            }
        }
    }


    public async addCash(req: Request, res: Response) {
        try {
            const { bills, coins } = req.body as {
                bills: {
                    value: number,
                    count: number,
                }[],
                coins: {
                    value: number,
                    count: number,
                }[]
            }

            if (!bills || !coins) throw new Error("Bills and coins are required");

            this.vm.addMoneyToRegister({ bills, coins });

            return sendResponse(res, {
                total: this.vm.getRegister().total
            }, false, "Cash added successfully", 201);

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

            return sendResponse(res, {
                total: this.vm.getRegister().total
            }, false, "Cash removed successfully", 200);
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error removing cash", 500);
            }
        }
    }


    public async getMode(req: Request, res: Response) {
        try {
            const mode = this.vm.getRegister().getMode();

            return sendResponse(res, mode, false, "Mode fetched successfully", 200);

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

            return sendResponse(res, this.vm.getRegister().getMode, false, "Mode set successfully", 200);

        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error setting mode", 500);
            }
        }
    }


    public async getProducts(req: Request, res: Response) {
        try {
            const products = this.vm.getInventory().getProducts();
            return sendResponse(res, products, false, "Products fetched successfully", 200)
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error fetching products", 500);
            }
        }
    }


    public async addProducts(req: Request, res: Response) {
        try {
            const products = req.body as Product[]

            if (!products) throw new Error("Product is required");

            if (typeof products === 'object' && !Array.isArray(products)) {
                throw new Error("Products must be an array");
            }


            this.vm.addProductsToInventory(products);

            return sendResponse(res, products, false, "Products added successfully", 201);
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

            return sendResponse(res, slot, false, "Product removed successfully", 200);

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

            return sendResponse(res, product, false, "Product updated successfully", 200);
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

            return sendResponse(res, product, false, "Product fetched successfully", 200);
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error fetching product", 500);
            }
        }
    }

    public async clearInventory(req: Request, res: Response) {
        try {
            this.vm.clearInventory();

            return sendResponse(res, {}, false, "Inventory cleared successfully", 200);
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error clearing inventory", 500);
            }
        }
    }



}