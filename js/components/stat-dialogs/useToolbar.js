"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const _crToolbarBt = (caption, title, onClick) => ({
  caption,
  title,
  onClick
});

const useToolbar = (_toggleLabels, _toggleInputs, _toggleOptions, onAbout) => {
  const [isToolbar, toggleToolBar] = (0, _useToggle.default)(true)
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _toolbarButtons = (0, _react.useMemo)(() => [_crToolbarBt('L', 'Click to toggle input labels', _toggleLabels), _crToolbarBt('T', 'Toggle Inputs', _toggleInputs), _crToolbarBt('O', 'Chart Options', _toggleOptions), _crToolbarBt('A', 'About Datasource', onAbout)], []); //_toggleLabels, _toggleInputs, _toggleOptions, onClickInfo

  /*eslint-enable react-hooks/exhaustive-deps */


  return [
  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
    isShow: isToolbar,
    buttons: _toolbarButtons
  }), [isToolbar]) //_toolbarButtons

  /*eslint-enable react-hooks/exhaustive-deps */
  , toggleToolBar];
};

var _default = useToolbar;
exports.default = _default;
//# sourceMappingURL=useToolbar.js.map