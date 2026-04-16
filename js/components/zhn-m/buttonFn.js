"use strict";

exports.__esModule = true;
exports.crButtonTitle = void 0;
var _arrFn = require("../../utils/arrFn");
const crButtonTitle = (title, hotKey) => hotKey ? (0, _arrFn.joinByBlank)(title, `[${hotKey.toLowerCase()}]`) : title || void 0;
exports.crButtonTitle = crButtonTitle;
//# sourceMappingURL=buttonFn.js.map