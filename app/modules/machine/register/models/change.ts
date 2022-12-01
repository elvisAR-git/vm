import Money from "./money";

export default interface Change {
    change: Money[],
    itemCost: number,
    amountPaid: number,
    changeDue: number,
}