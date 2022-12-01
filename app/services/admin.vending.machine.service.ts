import Money from "../modules/machine/core/register/money";
import VendingMachine from "../modules/machine/core/vending.machine";

export default class AdminVMService {

    constructor(private machine: VendingMachine) { }

    public updateMoney(money: {
        type: 'coin' | 'bill',
        money: Money
    }[]) {
        money.forEach(m => {
            this.machine.register.updateRegister(m.money, m.type)
        });

        return 'Updated Register'
    }

    public
}