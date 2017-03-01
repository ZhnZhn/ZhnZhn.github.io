"use strict";

Object.defineProperty(exports, "__esModule", {
     value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgPlus = function SvgPlus(_ref) {
     var onClick = _ref.onClick;
     return _react2.default.createElement(
          "div",
          { className: "button-circle", onClick: onClick },
          _react2.default.createElement(
               "svg",
               {
                    width: "20px", height: "20px",
                    viewBox: "0 0 20 20",
                    preserveAspectRatio: "none", xmlns: "http://www.w3.org/2000/svg"
               },
               _react2.default.createElement("path", {
                    d: "M 10,4 L 10,16 M 4,10 L 16,10",
                    strokeWidth: "2",
                    strokeLinecap: "round"
               })
          )
     );
};

exports.default = SvgPlus;
//# sourceMappingURL=SvgPlus.js.map