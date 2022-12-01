import Machine from "../../modules/machine";
import adminRoutes from "./admin";

export default function appControllers(
    vm: Machine
) {
    return Object.freeze({
        admin: adminRoutes(vm)
    });
}