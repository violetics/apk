const Violetics = require("../src");
const v = new Violetics("beta");

v.apkfap("Minecraft", function (error, data) {
    if (error) return console.error(error);
    console.log("data", data);
});
