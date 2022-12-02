import Machine from "../../../modules/machine";
import { sendError, sendResponse } from "../../common/common";
import { Request, Response } from "express";
export default class UserContoller {
    constructor(private vm: Machine) { }


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


    public async buyProduct(req: Request, res: Response) {
        try {
            const product = req.body as {
                qty: number,
                bills: { value: number, count: number }[],
                coins: { value: number, count: number }[],
                slot: number
            };
            if (!product) throw new Error("Product is required");
            this.vm.buyProduct(product.slot, product.qty, {
                bills: product.bills,
                coins: product.coins
            })
            return res.send(sendResponse({}, false, "Product bought successfully", 200));
        } catch (err) {
            if (err instanceof Error) {
                return sendError(res, err, "Error buying product", 500);
            }
        }
    }
}