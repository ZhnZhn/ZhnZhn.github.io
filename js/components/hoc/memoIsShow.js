"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const _isNotShouldRerender = (prevProps, nextProps) => prevProps.isShow === nextProps.isShow;

const memoIsShow = Comp => /*#__PURE__*/(0, _react.memo)(Comp, _isNotShouldRerender);

var _default = memoIsShow;
exports.default = _default;
//# sourceMappingURL=memoIsShow.js.map