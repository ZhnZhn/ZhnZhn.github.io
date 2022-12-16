"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types';

const CL = "hrz-container";
const CompContainer = _ref => {
  let {
    className = CL,
    addAction
  } = _ref;
  const [containers, setContainers] = (0, _uiApi.useState)([]);
  (0, _useListen.default)((actionType, Comp) => {
    if (actionType === addAction) {
      setContainers(arrComp => [Comp, ...arrComp]);
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: containers
  });
};

/*
CompContainer.propTypes = {
  className: PropTypes.string,
  addAction: PropTypes.string
}
*/
var _default = CompContainer;
exports.default = _default;
//# sourceMappingURL=CompContainer.js.map