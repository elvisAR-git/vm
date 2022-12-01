import _ from "lodash";


// All configurations will extend these options
// ============================================
const all = {
    env: process.env.NODE_ENV,
    appName: "Pariti Vending Machine App",
    LOCAL_URL: "http://localhost:9090",
    URL: "http://localhost:9090",
    apiVersion: process.env.API_VERSION || "v1",
};
export default _.merge(
    all,
    require("./" + process.env.NODE_ENV) || {}
);
