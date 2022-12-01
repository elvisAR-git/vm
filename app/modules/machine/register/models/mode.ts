import Money from "./money";

export default interface Mode {
    name: string;
    bills: Money[];
    coins: Money[];
}