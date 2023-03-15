"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useRefBool = _interopRequireDefault(require("../hooks/useRefBool"));
var _useDialog = _interopRequireDefault(require("./hooks/useDialog"));
var _checkAreDatesValid = _interopRequireDefault(require("./hooks/checkAreDatesValid"));
var _DialogCell = _interopRequireDefault(require("./DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
const INITIAL_IS_SECOND_YAXIS = false;
const DialogType4A = (0, _memoIsShow.default)(props => {
  const {
      isShow,
      caption,
      oneCaption,
      oneURI,
      oneJsonProp,
      twoCaption,
      msgOnNotSelected,
      initFromDate,
      initToDate,
      msgOnNotValidFormat,
      onTestDate,
      toTopLayer,
      onAbout,
      loadFn,
      onLoad,
      onShow,
      onClose
    } = props,
    [isShowDate, toggleDate] = (0, _useToggle.default)(true),
    [isShowOptions, toggleOptions] = (0, _useToggle.default)(false),
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, clearValidationMessages, hClose] = (0, _useDialog.default)({
      onAbout,
      onClose,
      toggleDate,
      toggleOptions
    }),
    [refSecondYAxis, hCheckSecondYAxis, hUnCheckSecondYAxis] = (0, _useRefBool.default)(INITIAL_IS_SECOND_YAXIS),
    _refDates = (0, _uiApi.useRef)(),
    _refOneTwo = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hLoad = (0, _uiApi.useCallback)(() => {
      const _oneTwoInst = (0, _uiApi.getRefValue)(_refOneTwo),
        {
          msg = []
        } = _oneTwoInst.getValidation();
      (0, _checkAreDatesValid.default)(_refDates, msg);
      if (msg.length === 0) {
        onLoad(loadFn(props, {
          ..._oneTwoInst.getValues(),
          ...(0, _uiApi.getRefValue)(_refDates).getValues(),
          hasSecondYAxis: (0, _uiApi.getRefValue)(refSecondYAxis)
        }));
        clearValidationMessages();
      } else {
        setValidationMessages(msg);
      }
    }, []);
  // props, loadFn, onLoad,
  // refSecondYAxis,
  // setValidationMessages, clearValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    caption: caption,
    menuModel: menuMoreModel,
    toTopLayer: toTopLayer,
    onLoad: _hLoad,
    onShow: onShow,
    onClose: hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
      ref: _refOneTwo,
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      oneCaption: oneCaption,
      oneJsonProp: oneJsonProp,
      twoCaption: twoCaption,
      msgOnNotSelected: msgOnNotSelected
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.DatesFragment, {
        ref: _refDates,
        isShowLabels: isShowLabels,
        initFromDate: initFromDate,
        initToDate: initToDate,
        msgOnNotValidFormat: msgOnNotValidFormat,
        onTestDate: onTestDate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowOptions,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox1, {
        initValue: INITIAL_IS_SECOND_YAXIS,
        caption: "Add Seria with Second YAxis",
        onCheck: hCheckSecondYAxis,
        onUnCheck: hUnCheckSecondYAxis
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = DialogType4A;
exports.default = _default;
//# sourceMappingURL=DialogType4A.js.map