"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useBool = _interopRequireDefault(require("./useBool"));
var _fUseKey = require("./fUseKey");
const useShowHideComponent = isShowInitial => {
  const [isShow, showComp, hideComp] = (0, _useBool.default)(isShowInitial);
  return [isShow, showComp, hideComp, (0, _fUseKey.useKeyEscape)(hideComp)];
};
var _default = exports.default = useShowHideComponent;
//# sourceMappingURL=useShowHideComponent.js.map