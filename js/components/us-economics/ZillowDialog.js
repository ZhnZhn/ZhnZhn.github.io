"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = require("../hooks/useToggle");
var _useProperty = require("../hooks/useProperty");
var _useToggleLabels = _interopRequireDefault(require("../dialogs/hooks/useToggleLabels"));
var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));
var _checkAreDatesValid = _interopRequireDefault(require("../dialogs/hooks/checkAreDatesValid"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _jsxRuntime = require("react/jsx-runtime");
const DATA_NOTE = "*Data present not for all zip codes";
const S_TIP = {
  margin: 10,
  marginTop: 16,
  fontWeight: "bold"
};
const _isByZipCode = item => !!item && item.v === "Z";
const _reZipCode = /^\d{5}$/;
const _isZipCode = value => _reZipCode.test(value.trim());
const ZillowDialog = (0, _memoIsShow.default)(props => {
  const {
      isShow,
      //caption,
      oneCaption,
      //oneURI,
      //twoCaption,
      //twoURI,
      //threeCaption,
      msgOnNotSelected,
      //initFromDate,
      //initToDate,
      //msgOnNotValidFormat,
      //onTestDate,

      loadId,
      dfTable,
      dfIdFn,
      dataSource,
      //toTopLayer,

      onLoad,
      onShow
    } = props,
    [isShowPattern, togglePattern] = (0, _useToggle.useToggle)(!1),
    [isShowDate, toggleDate] = (0, _useToggle.useToggle)(!1),
    [isShowLabels, toggleLabels] = (0, _useToggleLabels.default)(),
    [isToolbar, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)(props, {
      toggleDate
    }, toggleLabels),
    _refTypeCode = (0, _uiApi.useRef)(),
    _refZip = (0, _uiApi.useRef)(),
    _refDates = (0, _uiApi.useRef)(),
    [setMetric, getMetric] = (0, _useProperty.useProperty)()
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
          msgs.push("Zip Code is not valid");
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
          _datesInst = (0, _uiApi.getRefValue)(_refDates);
        onLoad({
          ..._datesInst.getValues(),
          items: [metric, _three],
          title: `${two.c}: ${_three.c}`,
          subtitle: metric.c,
          itemCaption: _three.c,
          isKeyFeature: _hasZipCode,
          loadId,
          dfTable,
          dfIdFn,
          dataSource
        });
      }
      setValidationMessages(msgs);
    }, []);
  // oneCaption, msgOnNotSelected,
  // loadId, dfTable, dfIdFn, dataSource, onLoad,
  // getMetric,
  // setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    caption: props.caption,
    menuModel: menuMoreModel,
    toTopLayer: props.toTopLayer,
    onLoad: _hLoad,
    onShow: onShow,
    onClose: hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: props.oneURI,
      caption: oneCaption,
      onSelect: setMetric
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectOneTwo, {
      refEl: _refTypeCode,
      isShow: isShow,
      isShowLabels: isShowLabels,
      isHideTwo: isShowPattern,
      uri: props.twoURI,
      oneCaption: props.twoCaption,
      twoCaption: props.threeCaption,
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
        initFromDate: props.initFromDate,
        initToDate: props.initToDate,
        msgOnNotValidFormat: props.msgOnNotValidFormat,
        onTestDate: props.onTestDate
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