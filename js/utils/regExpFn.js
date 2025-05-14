"use strict";

exports.__esModule = true;
exports.crRegExpReplacements = exports.REG_ONE_OR_MORE_BLANKS = void 0;
const REG_ONE_OR_MORE_BLANKS = exports.REG_ONE_OR_MORE_BLANKS = / +/g;
const crRegExpReplacements = objReplacements => new RegExp(Object.keys(objReplacements).join("|"), "g");
exports.crRegExpReplacements = crRegExpReplacements;
//# sourceMappingURL=regExpFn.js.map