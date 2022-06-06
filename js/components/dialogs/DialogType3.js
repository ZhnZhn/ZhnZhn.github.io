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

var _checkAreDatesValid = _interopRequireDefault(require("./hooks/checkAreDatesValid"));

var _getFromToDates = _interopRequireDefault(require("./hooks/getFromToDates"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const TRANSFORM_OPTIONS = [{
  caption: "NO EFFECT: z[t]=y[t]",
  value: "none"
}, {
  caption: "ROW-ON-ROW CHANGE: z[t]=y[t]–y[t-1]",
  value: "diff"
}, {
  caption: "ROW-ON-ROW % CHANGE: z[t]=(y[t]–y[t-1])/y[t-1]",
  value: "rdiff"
}, {
  caption: "LATEST VALUE AS % INCREMENT: z[t]=(y[latest]–y[t])/y[t]",
  value: "rdiff_from"
}, {
  caption: "SCALE SERIES TO START AT 100: z[t]=y[t]÷y[0]*100",
  value: "normalize"
}];
const DialogType3 = (0, _memoIsShow.default)(props => {
  const {
    isShow,
    isTransform,
    isWithInputStock,
    noDate,
    caption,
    oneCaption,
    itemCaption = 'Stock',
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
        [isShowTransform, toggleTransform] = (0, _useToggle.default)(),
        [isShowDate, toggleDate] = (0, _useToggle.default)(true),
        _toolbarButtons = (0, _useToolbar.default)({
    toggleLabels,
    toggleTransform: isTransform ? toggleTransform : void 0,
    toggleDate,
    onClickInfo
  }),
        [setItem, getItem] = (0, _useProperty.default)(),
        [setTransform, getTransform] = (0, _useProperty.default)(),
        [validationMessages, setValidationMessages, clearValidationMessages] = (0, _useValidationMessages.default)(),
        _refDates = (0, _uiApi.useRef)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _uiApi.useCallback)(() => {
    const _crVm = () => {
      const msgs = [];

      if (!getItem()) {
        msgs.push(msgOnNotSelected(oneCaption || itemCaption));
      }

      (0, _checkAreDatesValid.default)(_refDates, msgs);
      return msgs;
    },
          _validationMessages = _crVm();

    if (_validationMessages.length === 0) {
      onLoad(loadFn(props, {
        one: getItem(),
        transform: getTransform(),
        ...(0, _getFromToDates.default)(_refDates)
      }));
      clearValidationMessages();
    } else {
      setValidationMessages(_validationMessages);
    }
  }, []) // getItem, msgOnNotSelected, oneCaption, itemCaption,
  // getTransform, loadFn, onLoad
  // clearValidationMessages, setValidationMessages
  ,
        _hClose = (0, _uiApi.useCallback)(() => {
    onClose();
    clearValidationMessages();
  }, []) // onClose, clearValidationMessages

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _oneCaption = oneCaption || itemCaption,
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
      caption: _oneCaption,
      optionNames: optionNames,
      isWithInput: isWithInputStock,
      onSelect: setItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowTransform,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        isShowLabels: isShowLabels,
        caption: "Transform",
        options: TRANSFORM_OPTIONS,
        onSelect: setTransform
      })
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
/*
DialogType3.propTypes = {
  isShow: PropTypes.bool,
  caption: PropTypes.string,
  itemCaption: PropTypes.string,
  optionURI: PropTypes.string,
  optionsJsonProp: PropTypes.string,
  optionNames: PropTypes.string,
  initFromDate: PropTypes.string,
  initToDate: PropTypes.string,
  msgOnNotValidFormat: PropTypes.func,
  onTestDate: PropTypes.func,
  onShow: PropTypes.func,

  descrUrl: PropTypes.string,
  isTransform: PropTypes.bool,
  onClickInfo: PropTypes.func,
  loadFn: PropTypes.func
}
*/

var _default = DialogType3;
exports.default = _default;
//# sourceMappingURL=DialogType3.js.map