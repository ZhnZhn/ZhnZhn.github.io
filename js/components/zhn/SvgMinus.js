"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = "button-circle";

var SvgMinus = function SvgMinus(_ref) {
   var style = _ref.style,
       onClick = _ref.onClick;
   return _react2.default.createElement(
      "button",
      { className: CL, style: style, onClick: onClick },
      _react2.default.createElement(
         "svg",
         {
            width: "20px", height: "20px",
            viewBox: "0 0 20 20",
            preserveAspectRatio: "none", xmlns: "http://www.w3.org/2000/svg"
         },
         _react2.default.createElement("path", {
            strokeWidth: "2",
            strokeLinecap: "round",
            d: "M 4,10 L 16,10"
         })
      )
   );
};

exports.default = SvgMinus;
//# sourceMappingURL=SvgMinus.js.map