
// Development specific configuration
// ==================================
module.exports = {
    ip: process.env.CLUSTER_IP || process.env.IP || "0.0.0.0",
    // Server port
    port: process.env.PORT || 9090,
};
