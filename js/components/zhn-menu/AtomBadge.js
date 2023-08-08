"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));
var _jsxRuntime = require("react/jsx-runtime");
const TH_ID = 'ELEMENT',
  CL = "menu__badge",
  S_BADGE_OPEN = {
    color: '#a487d4'
  };
const AtomBadge = _ref => {
  let {
    atomBadge,
    onOpen,
    onClose
  } = _ref;
  const {
      is,
      value
    } = atomBadge.useAtomValue(),
    _hClick = (0, _uiApi.useCallback)(evt => {
      evt.stopPropagation();
      if (is) {
        onClose();
      } else {
        onOpen();
      }
    }, [is, onOpen, onClose]),
    TS = (0, _useTheme.default)(TH_ID),
    _btStyle = is ? S_BADGE_OPEN : null;
  return value === 0 ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
    tabIndex: "-1",
    className: CL,
    style: {
      ..._btStyle,
      ...TS.BG
    },
    caption: value,
    onClick: _hClick
  });
};
var _default = AtomBadge;
exports.default = _default;
//# sourceMappingURL=AtomBadge.js.map