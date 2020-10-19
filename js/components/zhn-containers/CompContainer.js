"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

//import PropTypes from 'prop-types';
var CL = "hrz-container";

var CompContainer = function CompContainer(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? CL : _ref$className,
      store = _ref.store,
      addAction = _ref.addAction;

  var _useState = (0, _react.useState)([]),
      containers = _useState[0],
      setContainers = _useState[1];

  (0, _useListen["default"])(store, function (actionType, Comp) {
    if (actionType === addAction) {
      setContainers(function (arrComp) {
        return [Comp].concat(arrComp);
      });
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
  store: PropTypes.shape({
    listen: PropTypes.func
  }),
  addAction: PropTypes.string
}
*/


var _default = CompContainer;
exports["default"] = _default;
//# sourceMappingURL=CompContainer.js.map