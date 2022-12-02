import Machine from "../../../modules/machine";
import { Request, Response } from "express";
import { sendResponse, sendError } from "../../common/common";
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
}