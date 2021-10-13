"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _useToggle = _interopRequireDefault(require("./useToggle2"));

var _jsxRuntime = require("react/jsx-runtime");

const useModalOptions = () => {
  const _refDialogOptions = (0, _react.useRef)({}),
        [isOptions, _toggleOptions, _hideOptions] = (0, _useToggle.default)(false),
        _toggleDialogOption = (0, _react.useCallback)(propName => {
    _refDialogOptions.current[propName] = !_refDialogOptions.current[propName];
  }, []);

  return [
  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalOptions, {
    isShow: isOptions,
    toggleOption: _toggleDialogOption,
    onClose: _hideOptions
  }), [isOptions]) //_toggleDialogOption, _hideOptions

  /*eslint-enable react-hooks/exhaustive-deps */
  , _refDialogOptions, _toggleOptions];
};

var _default = useModalOptions;
exports.default = _default;
//# sourceMappingURL=useModalOptions.js.map