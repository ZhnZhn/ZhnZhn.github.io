"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));

var _crValidationMessages = _interopRequireDefault(require("../dialogs/hooks/crValidationMessages"));

var _getFromToDates = _interopRequireDefault(require("../dialogs/hooks/getFromToDates"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const DialogType4 = (0, _memoIsShow.default)(props => {
  const {
    isShow,
    noDate,
    caption,
    oneCaption,
    oneNames,
    oneURI,
    oneJsonProp,
    isWithOneInput,
    twoCaption,
    twoNames,
    twoURI,
    twoJsonProp,
    isWithInputTwo,
    threeCaption,
    threeNames,
    threeURI,
    threeJsonProp,
    isWithInputThree,
    initFromDate,
    initToDate,
    msgOnNotSelected,
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
        [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, clearValidationMessages, hClose] = (0, _useDialog.default)({
    onAbout,
    onClose,
    toggleDate: noDate ? void 0 : toggleDate
  }),
        [setOne, getOne] = (0, _useProperty.default)(),
        [setTwo, getTwo] = (0, _useProperty.default)(),
        [setThree, getThree] = (0, _useProperty.default)(),
        _refDates = (0, _uiApi.useRef)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _uiApi.useCallback)(() => {
    const one = getOne(),
          two = getTwo(),
          three = getThree(),
          _configs = [[one, oneCaption], [two, twoCaption], threeURI ? [three, threeCaption] : void 0].filter(Boolean),
          msgs = (0, _crValidationMessages.default)(_configs, msgOnNotSelected, _refDates);

    if (msgs.length === 0) {
      onLoad(loadFn(props, {
        one,
        two,
        three,
        ...(0, _getFromToDates.default)(_refDates)
      }));
      clearValidationMessages();
    } else {
      setValidationMessages(msgs);
    }
  }, []); // props, oneCaption, twoCaption, threeCaption, threeURI, loadFn, onLoad
  // getOne, getTwo, getThree
  // clearValidationMessages, setValidationMessages

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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      isWithInput: isWithOneInput,
      uri: oneURI,
      jsonProp: oneJsonProp,
      caption: oneCaption,
      optionNames: oneNames,
      onSelect: setOne
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      isWithInput: isWithInputTwo,
      uri: twoURI,
      jsonProp: twoJsonProp,
      caption: twoCaption,
      optionNames: twoNames,
      onSelect: setTwo
    }), threeURI && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      isWithInput: isWithInputThree,
      uri: threeURI,
      jsonProp: threeJsonProp,
      caption: threeCaption,
      optionNames: threeNames,
      onSelect: setThree
    }), noDate !== true && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
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
var _default = DialogType4;
exports.default = _default;
//# sourceMappingURL=DialogType4.js.map