"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _useToggle = _interopRequireDefault(require("./useToggle2"));

var _crIsId = _interopRequireDefault(require("./crIsId"));

var _jsxRuntime = require("react/jsx-runtime");

const useModalToggle = configs => {
  const [isToggle, _toggleInputs, _hideInputs] = (0, _useToggle.default)(false),
        [isRow, setIsRow] = (0, _react.useState)({
    isShowChart: true,
    isShowDate: false
  }),
        {
    isShowChart,
    isShowDate
  } = isRow,
        _toggleIsRow = (0, _react.useCallback)(propName => {
    setIsRow(is => {
      is[propName] = !is[propName];
      return { ...is
      };
    });
  }, []),
        _refTitles = (0, _react.useRef)([]),
        _checkCaptionBy = (0, _react.useCallback)(index => {
    _refTitles.current.push(index);
  }, []),
        _uncheckCaption = (0, _react.useCallback)(index => {
    _refTitles.current = _refTitles.current.filter(v => v !== index);
  }, []);

  return [
  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _react.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ModalToggle, {
    isShow: isToggle,
    selectProps: configs,
    isShowChart: isShowChart,
    isShowDate: isShowDate,
    crIsId: _crIsId.default,
    onToggle: _toggleIsRow,
    onCheckCaption: _checkCaptionBy,
    onUnCheckCaption: _uncheckCaption,
    onClose: _hideInputs
  }), [isToggle, configs, isShowChart, isShowDate]) //_toggleIsRow, _checkCaptionBy, _uncheckCaption, _hideInputs

  /*eslint-enable react-hooks/exhaustive-deps */
  , _refTitles, isRow, setIsRow, _toggleInputs];
};

var _default = useModalToggle;
exports.default = _default;
//# sourceMappingURL=useModalToggle.js.map