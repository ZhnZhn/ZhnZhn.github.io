"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useMenuMore = _interopRequireDefault(require("./hooks/useMenuMore"));

var _useToolbar = _interopRequireDefault(require("./hooks/useToolbar"));

var _useValidationMessages = _interopRequireDefault(require("./hooks/useValidationMessages"));

var _crValidationMessages = _interopRequireDefault(require("./hooks/crValidationMessages"));

var _getFromToDates = _interopRequireDefault(require("./hooks/getFromToDates"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const DialogType3 = (0, _memoIsShow.default)(props => {
  const {
    isShow,
    isWithInputStock,
    noDate,
    caption,
    itemCaption = 'Stock',
    oneCaption = itemCaption,
    oneURI,
    optionURI,
    optionsJsonProp,
    optionNames = 'Stocks',
    onePlaceholder,
    msgOnNotSelected,
    msgOnNotValidFormat,
    initFromDate,
    initToDate,
    onTestDate,
    loadFn,
    onLoad,
    onShow,
    onFront,
    onClose,
    onClickInfo
  } = props,
        [isToolbar, menuMoreModel] = (0, _useMenuMore.default)(onClickInfo),
        [isShowLabels, toggleLabels] = (0, _useToggle.default)(true),
        [isShowDate, toggleDate] = (0, _useToggle.default)(true),
        _toolbarButtons = (0, _useToolbar.default)({
    toggleLabels,
    toggleDate,
    onClickInfo
  }),
        [setItem, getItem] = (0, _useProperty.default)(),
        [validationMessages, setValidationMessages, clearValidationMessages, _hClose] = (0, _useValidationMessages.default)(onClose),
        _refDates = (0, _uiApi.useRef)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _uiApi.useCallback)(() => {
    const one = getItem(),
          _msgs = (0, _crValidationMessages.default)([[one, oneCaption]], msgOnNotSelected, _refDates);

    if (_msgs.length === 0) {
      onLoad(loadFn(props, {
        one,
        ...(0, _getFromToDates.default)(_refDates)
      }));
      clearValidationMessages();
    } else {
      setValidationMessages(_msgs);
    }
  }, []) // getItem, msgOnNotSelected, oneCaption,
  // loadFn, onLoad
  // clearValidationMessages, setValidationMessages

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _oneURI = oneURI || optionURI;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    menuModel: menuMoreModel,
    caption: caption,
    onLoad: _hLoad,
    onShowChart: onShow,
    onFront: onFront,
    onClose: _hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      placeholder: onePlaceholder,
      uri: _oneURI,
      jsonProp: optionsJsonProp,
      caption: oneCaption,
      optionNames: optionNames,
      isWithInput: isWithInputStock,
      onSelect: setItem
    }), !noDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.DatesFragment, {
        ref: _refDates,
        isShowLabels: isShowLabels,
        initFromDate: initFromDate,
        initToDate: initToDate,
        msgOnNotValidFormat: msgOnNotValidFormat,
        onTestDate: onTestDate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = DialogType3;
exports.default = _default;
//# sourceMappingURL=DialogType3.js.map