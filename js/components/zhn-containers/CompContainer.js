"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useStoreState = _interopRequireDefault(require("../hooks/useStoreState"));
var _jsxRuntime = require("react/jsx-runtime");
const CL = "hrz-container";
const updateContainers = (msInit, setContainers) => {
  if (msInit && msInit.Comp) {
    setContainers(arrComp => [msInit.Comp, ...arrComp]);
  }
};
const CompContainer = _ref => {
  let {
    className = CL,
    useMsInit
  } = _ref;
  const containers = (0, _useStoreState.default)([], useMsInit, updateContainers)[0];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: containers
  });
};
var _default = exports.default = CompContainer;
//# sourceMappingURL=CompContainer.js.map