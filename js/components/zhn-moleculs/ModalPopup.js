"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useModalPopup = exports.ModalPopup = void 0;
var _uiApi = require("../uiApi");
var _useFocus = require("../hooks/useFocus");
var _ModalPane = _interopRequireDefault(require("./ModalPane"));
var _FocusTrap = _interopRequireDefault(require("./FocusTrap"));
var _jsxRuntime = require("react/jsx-runtime");
const useFocusTrap = props => {
  const refFirst = (0, _useFocus.useFocusFirstItem)(props.isShow),
    refLast = (0, _uiApi.useRef)();
  /*eslint-disable react-hooks/exhaustive-deps*/
  return (0, _uiApi.useMemo)(() => [refFirst, refLast], []);
  //_refFirstItem
  /*eslint-enable react-hooks/exhaustive-deps*/
};
const ModalPopupContext = (0, _uiApi.createContext)(),
  ModalPopupProvider = ModalPopupContext.Provider;
const useModalPopup = () => (0, _uiApi.useContext)(ModalPopupContext);
exports.useModalPopup = useModalPopup;
const ModalPopup = props => {
  const modalPopupContextValue = useFocusTrap(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    ...props,
    "aria-modal": props.isShow ? "true" : void 0,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ModalPopupProvider, {
      value: modalPopupContextValue,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FocusTrap.default, {
        refFirst: modalPopupContextValue[0],
        refLast: modalPopupContextValue[1],
        children: props.children
      })
    })
  });
};
exports.ModalPopup = ModalPopup;
//# sourceMappingURL=ModalPopup.js.map