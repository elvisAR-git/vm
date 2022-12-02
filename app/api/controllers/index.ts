import Machine from "../../modules/machine";
import adminRoutes from "./admin";
import userRoutes from "./users";

export default function appControllers(
    vm: Machine
) {
    // injecting the Vending Machine instance into the controllers
    return Object.freeze({
        admin: adminRoutes(vm),
        user: userRoutes(vm)
    });
}