"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));
var _checkAreDatesValid = _interopRequireDefault(require("../dialogs/hooks/checkAreDatesValid"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
const DATA_NOTE = '*Data present not for all zip codes';
const S_TIP = {
  margin: 10,
  marginTop: 16,
  fontWeight: 'bold'
};
const _isFn = fn => typeof fn === 'function';
const _isByZipCode = item => !!item && item.v === 'Z';
const _reZipCode = /^\d{5}$/;
const _isZipCode = value => _reZipCode.test(value.trim());
const ZillowDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    caption,
    oneCaption,
    oneURI,
    oneJsonProp,
    twoCaption,
    twoURI,
    twoJsonProp,
    threeCaption,
    msgOnNotSelected,
    initFromDate,
    initToDate,
    msgOnNotValidFormat,
    onTestDate,
    dataColumn,
    loadId,
    dfTable,
    dataSource,
    toTopLayer,
    onAbout,
    fnValue,
    onLoad,
    onShow,
    onClose
  } = _ref;
  const [isShowPattern, togglePattern] = (0, _useToggle.default)(false),
    [isShowDate, toggleDate] = (0, _useToggle.default)(false),
    [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)({
      onAbout,
      onClose,
      toggleDate
    }),
    _refTypeCode = (0, _uiApi.useRef)(),
    _refZip = (0, _uiApi.useRef)(),
    _refDates = (0, _uiApi.useRef)(),
    [setMetric, getMetric] = (0, _useProperty.default)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hSelectType = (0, _uiApi.useCallback)(type => {
      togglePattern(_isByZipCode(type));
    }, [])
    // togglePattern
    ,
    _hLoad = (0, _uiApi.useCallback)(() => {
      const msgs = [],
        metric = getMetric(),
        _typeCodeInst = (0, _uiApi.getRefValue)(_refTypeCode),
        {
          one
        } = _typeCodeInst.getValues(),
        _zipCodeInst = (0, _uiApi.getRefValue)(_refZip);
      if (!metric) {
        msgs.push(msgOnNotSelected(oneCaption));
      }
      if (_isByZipCode(one)) {
        if (!_zipCodeInst.isValid()) {
          msgs.push('Zip Code is not valid');
        }
      } else {
        const {
          msg = []
        } = _typeCodeInst.getValidation();
        if (msg.length !== 0) {
          msgs.push(...msg);
        }
      }
      (0, _checkAreDatesValid.default)(_refDates, msgs);
      if (msgs.length === 0) {
        const {
            one: two,
            two: three
          } = _typeCodeInst.getValues(),
          zipCode = _zipCodeInst.getValue(),
          _hasZipCode = _isByZipCode(two),
          _three = !_hasZipCode ? three : {
            v: zipCode,
            c: zipCode
          },
          value = _isFn(fnValue) ? fnValue(metric.v, _three.v) : void 0,
          _datesInst = (0, _uiApi.getRefValue)(_refDates);
        onLoad({
          ..._datesInst.getValues(),
          title: two.c + ": " + _three.c,
          subtitle: metric.c,
          itemCaption: _three.c,
          isKeyFeature: _hasZipCode,
          value,
          dataColumn,
          loadId,
          dfTable,
          dataSource
        });
      }
      setValidationMessages(msgs);
    }, []);
  // oneCaption, msgOnNotSelected,
  // fnValue, dataColumn, loadId, dataSource, onLoad,
  // getMetric,
  // setValidationMessages
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
      uri: oneURI,
      jsonProp: oneJsonProp,
      caption: oneCaption,
      optionNames: "Items",
      onSelect: setMetric
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
      ref: _refTypeCode,
      isShow: isShow,
      isShowLabels: isShowLabels,
      isHideTwo: isShowPattern,
      uri: twoURI,
      oneCaption: twoCaption,
      oneJsonProp: twoJsonProp,
      twoCaption: threeCaption,
      propCaption: "c",
      msgOnNotSelected: msgOnNotSelected,
      onSelectOne: _hSelectType
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowPattern,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowPattern, {
        refEl: _refZip,
        isShowLabels: isShowLabels,
        caption: "*Zip Code",
        placeholder: "Zip Code, 5 Digits",
        onTest: _isZipCode,
        errorMsg: "5 digits format is required"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.InputPeriod, {
        refEl: _refDates,
        isShowLabels: isShowLabels,
        initFromDate: initFromDate,
        initToDate: initToDate,
        msgOnNotValidFormat: msgOnNotValidFormat,
        onTestDate: onTestDate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowPattern,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S_TIP,
        children: DATA_NOTE
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ValidationMessages, {
      validationMessages: validationMessages
    })]
  });
});
var _default = exports.default = ZillowDialog;
//# sourceMappingURL=ZillowDialog.js.map