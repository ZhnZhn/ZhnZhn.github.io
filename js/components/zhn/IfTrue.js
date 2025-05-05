"use strict";

exports.__esModule = true;
exports.IfTrueOr = exports.IfTrue = void 0;
const IfTrue = _ref => {
  let {
    v,
    children
  } = _ref;
  return v ? children : null;
};
exports.IfTrue = IfTrue;
const IfTrueOr = _ref2 => {
  let {
    v,
    children
  } = _ref2;
  return v ? children[0] : children[1];
};
exports.IfTrueOr = IfTrueOr;
//# sourceMappingURL=IfTrue.js.map