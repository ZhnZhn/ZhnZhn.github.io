"use strict";

exports.__esModule = true;
exports.default = void 0;
var _useBool = require("./useBool");
var _fUseKey = require("./fUseKey");
const useShowHideComponent = isShowInitial => {
  const [isShow, showComp, hideComp] = (0, _useBool.useBool)(isShowInitial);
  return [isShow, showComp, hideComp, (0, _fUseKey.useKeyEscape)(hideComp)];
};
var _default = exports.default = useShowHideComponent;
//# sourceMappingURL=useShowHideComponent.js.map