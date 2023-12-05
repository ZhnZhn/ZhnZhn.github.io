"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const CL = "hrz-container";
const CompContainer = _ref => {
  let {
    className = CL,
    useMsInit
  } = _ref;
  const [containers, setContainers] = (0, _uiApi.useState)([]);
  useMsInit(msInit => {
    if (msInit && msInit.Comp) {
      setContainers(arrComp => [msInit.Comp, ...arrComp]);
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: containers
  });
};
var _default = exports.default = CompContainer;
//# sourceMappingURL=CompContainer.js.map