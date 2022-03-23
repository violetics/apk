const { VioleticsError, request } = require("../utils");
const plugins = require("./plugins");
const plugin = [];

function send(url, params, fn) {
	if (fn && typeof fn == "function") {
		return request(url, params)
			.then((data) => fn(null, data))
			.catch((error) => fn(error, null));
	}
	return request(url, params);
}

for (var i = 0; i < plugins.length; i++) {
	let plugin_ = plugins[i];
	plugin[plugin_] = function Violetics(self) {
		let { BASE, apikey } = self;
		return function Violetics(apps, fn) {
			if (!apps || typeof apps != "string")
				throw new VioleticsError(`${plugin_}() required apps and must be typeof string`);
			return send(BASE(plugin_), { apikey: apikey, apps: apps }, fn);
		};
	};
}

module.exports = plugin;
