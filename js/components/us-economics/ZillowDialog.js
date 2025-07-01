"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = require("../hooks/useToggle");
var _useProperty = require("../hooks/useProperty");
var _useDialog = _interopRequireDefault(require("../dialogs/hooks/useDialog"));
var _useModalToggle = _interopRequireDefault(require("../dialogs/hooks/useModalToggle"));
var _checkAreDatesValid = _interopRequireDefault(require("../dialogs/hooks/checkAreDatesValid"));
var _DraggableDialog = _interopRequireDefault(require("../zhn-moleculs/DraggableDialog"));
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));
var _Toolbar = _interopRequireDefault(require("../dialogs/Toolbar"));
var _SelectWithLoad = _interopRequireDefault(require("../dialogs/SelectWithLoad"));
var _ModalToggleInputs = _interopRequireDefault(require("../dialogs/modals/ModalToggleInputs"));
var _SelectOneTwo = _interopRequireDefault(require("../dialogs/rows/SelectOneTwo"));
var _RowPattern = _interopRequireDefault(require("../dialogs/rows/RowPattern"));
var _InputPeriod = _interopRequireDefault(require("../dialogs/rows/InputPeriod"));
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
    [isShowToggle, toggleInputs, hideToggle, isShowLabels, toggleLabels] = (0, _useModalToggle.default)(),
    [isToolbar, menuMoreModel, toolbarButtons, validationMessages, setValidationMessages, hClose] = (0, _useDialog.default)(props, {
      toggleInputs
    }),
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

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DraggableDialog.default, {
    isShow: isShow,
    caption: props.caption,
    menuModel: menuMoreModel,
    toTopLayer: props.toTopLayer,
    onLoad: _hLoad,
    onShow: onShow,
    onClose: hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Toolbar.default, {
      isShow: isToolbar,
      buttons: toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalToggleInputs.default, {
      isShow: isShowToggle,
      isShowLabels: isShowLabels,
      configs: [["Date Period", isShowDate, toggleDate]],
      onToggleLabels: toggleLabels,
      onClose: hideToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectWithLoad.default, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: props.oneURI,
      caption: oneCaption,
      onSelect: setMetric
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectOneTwo.default, {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowPattern,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPattern.default, {
        refEl: _refZip,
        isShowLabels: isShowLabels,
        caption: "*Zip Code",
        placeholder: "Zip Code, 5 Digits",
        onTest: _isZipCode,
        errorMsg: "5 digits format is required"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputPeriod.default, {
        refEl: _refDates,
        isShowLabels: isShowLabels,
        initFromDate: props.initFromDate,
        initToDate: props.initToDate,
        msgOnNotValidFormat: props.msgOnNotValidFormat,
        onTestDate: props.onTestDate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowPattern,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S_TIP,
        children: DATA_NOTE
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages.default, {
      validationMessages: validationMessages
    })]
  });
});
var _default = exports.default = ZillowDialog;
//# sourceMappingURL=ZillowDialog.js.map