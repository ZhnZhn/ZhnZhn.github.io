"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _useClickOutside = _interopRequireDefault(require("../hooks/useClickOutside"));

var _useKeyEscape = _interopRequireDefault(require("../hooks/useKeyEscape"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const TH_ID = 'MODAL_PANE';

const ModalPane = _ref => {
  let {
    isShow,
    style,
    children,
    onClose
  } = _ref;

  const _refNode = (0, _useClickOutside.default)(isShow, onClose),
        _hKeyEscape = (0, _useKeyEscape.default)(onClose),
        _hKeyDown = isShow ? _hKeyEscape : void 0,
        TS = (0, _useTheme.default)(TH_ID);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    role: "presentation",
    ref: _refNode,
    style: { ...style,
      ...TS.ROOT
    },
    onKeyDown: _hKeyDown,
    children: children
  });
};
/*
ModalPane.propTypes = {
 className: PropTypes.string,
 style: PropTypes.object,
 isShow: PropTypes.bool,
 onClose: PropTypes.func
}
*/


var _default = ModalPane;
exports.default = _default;
//# sourceMappingURL=ModalPane.js.map