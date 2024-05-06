"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _usePasteTo = _interopRequireDefault(require("./usePasteTo"));
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _SeriesPane = _interopRequireDefault(require("./SeriesPane"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MODAL = {
    position: 'static',
    width: 365,
    height: 340,
    margin: '70px auto 0px'
  },
  S_SERIES_PANE = {
    overflowY: 'auto',
    height: 250,
    padding: '8px 10px 0 0'
  };
const DF_DATA = {};
const PasteToModalDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data = DF_DATA,
    onClose
  } = _ref;
  const [toChart, refCompSeries, commandButtons] = (0, _usePasteTo.default)(data, onClose),
    {
      fromChart
    } = data;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    isShow: isShow,
    style: S_MODAL,
    caption: "Paste Series To",
    commandButtons: commandButtons,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeriesPane.default, {
      refEl: refCompSeries,
      style: S_SERIES_PANE,
      fromChart: fromChart,
      toChart: toChart
    })
  });
});
var _default = exports.default = PasteToModalDialog;
//# sourceMappingURL=PasteToModalDialog.js.map