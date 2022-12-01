import Money from "./money";

export default interface Change {
    cash: Money[],
    itemCost: number,
    amountPaid: number,
    changeDue: number,
}