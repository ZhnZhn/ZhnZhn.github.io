"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

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
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className
  }, containers);
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