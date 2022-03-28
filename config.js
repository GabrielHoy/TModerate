const fs = require("fs");
exports.config = (() => {
	try {
		let configFile = fs.readFileSync("config.json").toString().trim();
		let config = JSON.parse(configFile);
		return config;
	}
	catch (e) {
		console.log("ERR CONFIGFILEPARSE");
		console.log(e);
	}
})();