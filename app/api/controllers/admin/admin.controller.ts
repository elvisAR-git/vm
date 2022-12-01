import Machine from "../../../modules/machine";
import { Request, Response } from "express";
import { send_response } from "../../common/common";

export default class AdminController {

    constructor(private vm: Machine) {
    }

    public async getTotalAmount(req: Request, res: Response) {
        console.log("getTotalAmount", this);
        try {
            const total = this.vm.getRegister().total;

            return res.send(send_response({
                total
            }, false, "Total amount fetched successfully", 200));
        } catch (err) {
            console.log(err);
            return res.send(send_response(err, true, "Error fetching total amount", 500));
        }
    }

    public async getCash(req: Request, res: Response) {
        console.log("getCash", this);
        try {
            const cash = {
                total: this.vm.getRegister().total,
                coins: this.vm.getRegister().getCoins(),
                bills: this.vm.getRegister().getBills()
            }

            return res.send(send_response({
                cash
            }, false, "Cash amount fetched successfully", 200));
        } catch (err) {
            console.log(err);
            return res.send(send_response(err, true, "Error fetching cash amount", 500));
        }
    }
}