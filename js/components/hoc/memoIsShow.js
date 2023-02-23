"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const _arePropsEqual = (prevProps, nextProps) => prevProps.isShow === nextProps.isShow;
const memoIsShow = Comp => (0, _uiApi.memo)(Comp, _arePropsEqual);
var _default = memoIsShow;
exports.default = _default;
//# sourceMappingURL=memoIsShow.js.map