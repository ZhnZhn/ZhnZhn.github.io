'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.default = safeGet;
function safeGet(obj, path, df) {
		function everyFn(step) {
				return !(step && (obj = obj[step]) === undefined);
		}

		if (!obj) {
				return df;
		}
		var steps = ('' + path).replace(/\[/g, '.').replace(/]/g, '').split('.').filter(Boolean);

		return steps.every(everyFn) ? obj : df;
}
//# sourceMappingURL=safeGet.js.map