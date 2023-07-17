"use strict";

exports.__esModule = true;
exports.default = void 0;
const fCompareBy = by => (arrOrObjA, arrOrObjB) => (arrOrObjA || {})[by] < (arrOrObjB || {})[by] ? -1 : (arrOrObjA || {})[by] === (arrOrObjB || {})[by] ? 0 : 1;
var _default = fCompareBy;
exports.default = _default;
//# sourceMappingURL=fCompareBy.js.map