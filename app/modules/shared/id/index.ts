import ObjectID from "bson-objectid";
import Id from "./id";

export const IdGenerator: Id = {
    newId: () => {
        return ObjectID().toHexString().toString()
    }
}