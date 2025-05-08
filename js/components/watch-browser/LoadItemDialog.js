"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LoadType = require("../../constants/LoadType");
var _BrowserType = require("../../constants/BrowserType");
var _dateFn = require("../../utils/dateFn");
var _formatNumber = _interopRequireDefault(require("../../utils/formatNumber"));
var _itemStore = require("../../flux/stores/itemStore");
var _uiApi = require("../uiApi");
var _has = require("../has");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useToggle = require("../hooks/useToggle");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _Toolbar = _interopRequireDefault(require("../dialogs/Toolbar"));
var _Buttons = require("../dialogs/Buttons");
var _InputPeriod = _interopRequireDefault(require("../dialogs/rows/InputPeriod"));
var _RowText = _interopRequireDefault(require("../dialogs/rows/RowText"));
var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _jsxRuntime = require("react/jsx-runtime");
const S_DIALOG = {
    width: 365
  },
  S_DIALOG_SHORT = {
    width: 265
  },
  S_ITEM_TEXT = {
    display: 'inline-block',
    maxWidth: 250,
    height: 32,
    verticalAlign: 'middle'
  };
const _isNumber = n => typeof n === 'number' && n - n === 0;
const _crValue = function (x, y) {
  if (x === void 0) {
    x = '';
  }
  if (y === void 0) {
    y = '';
  }
  return `${(0, _formatNumber.default)(y)} ${(0, _dateFn.mlsToDmy)(x)}`.trim();
};
const HAS_WIDE_WIDTH = (0, _has.isWideWidth)(),
  DF_DATA = {},
  DF_FROM_DATE = (0, _dateFn.getFromDate)(2),
  DF_TO_DATE = (0, _dateFn.getToDate)();
const LoadItemDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data = DF_DATA,
    onClose
  } = _ref;
  const _refDates = (0, _uiApi.useRef)(),
    {
      caption,
      fromDate,
      initToDate,
      onTestDate,
      itemConf
    } = data,
    {
      dataSource,
      x,
      y
    } = itemConf || {},
    [isShowLabels, _toggleIsShowLabels] = (0, _useToggle.useToggle)(HAS_WIDE_WIDTH),
    [isValue, _toggleIsValue] = (0, _useToggle.useToggle)(_isNumber(x)),
    [isShowDate, _toggleIsShowDate] = (0, _useToggle.useToggle)(),
    _toolbarButtons = (0, _uiApi.getRefValue)((0, _uiApi.useRef)([{
      caption: 'L',
      title: 'Click to toggle input labels',
      onClick: _toggleIsShowLabels
    }, {
      caption: 'V',
      title: 'Click to toggle row value',
      onClick: _toggleIsValue
    }, {
      caption: 'D',
      title: 'Click to toggle date input',
      onClick: _toggleIsShowDate
    }])),
    [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
    _hLoad = () => {
      const _datesInst = (0, _uiApi.getRefValue)(_refDates),
        {
          isValid,
          datesMsg
        } = _datesInst.getValidation(),
        _validationMessages = isValid ? [] : datesMsg;
      if (_validationMessages.length === 0) {
        const {
            id,
            title,
            subtitle,
            caption,
            columnName,
            dataColumn,
            seriaColumnNames,
            itemConf = {}

            //_itemKey, url, loadId,
            //optionFetch, items,
            //itemCaption, seriaType,
            //dataSource, dfId, timeId
          } = data,
          {
            fromDate,
            toDate
          } = _datesInst.getValues(),
          option = {
            id,
            title,
            subtitle,
            value: caption,
            item: caption,
            fromDate,
            toDate,
            columnName,
            dataColumn,
            seriaColumnNames,
            loadId: itemConf.loadId || _LoadType.LT_WL,
            ...itemConf
          };
        (0, _itemStore.loadItem)({
          chartType: _LoadType.LT_WATCH_LIST,
          browserType: _BrowserType.BT_WATCH_LIST
        }, option);
        onClose();
        setValidationMessages(prevVms => prevVms.length > 0 ? [] : prevVms);
      } else {
        setValidationMessages(_validationMessages);
      }
    },
    _commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Buttons.ButtonLoad, {
      onClick: _hLoad
    }, "load")],
    _hClose = () => {
      onClose();
      setValidationMessages([]);
    };
  (0, _uiApi.useEffect)(() => {
    _toggleIsValue(_isNumber(x));
  }, [x, _toggleIsValue]);
  const _initFromDate = fromDate || DF_FROM_DATE,
    _initToDate = initToDate || DF_TO_DATE,
    _onTestDate = onTestDate || _dateFn.isYmd,
    _style = isShowLabels ? S_DIALOG : S_DIALOG_SHORT,
    _value = _crValue(x, y);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    style: _style,
    isShow: isShow,
    caption: "Load Item",
    commandButtons: _commandButtons,
    onClose: _hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Toolbar.default, {
      isShow: true,
      buttons: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowText.default, {
      isShowLabels: isShowLabels,
      textStyle: S_ITEM_TEXT,
      caption: "Item:",
      text: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isValue,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowText.default, {
        isShowLabels: isShowLabels,
        textStyle: S_ITEM_TEXT,
        caption: "Value:",
        text: _value
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputPeriod.default, {
        refEl: _refDates,
        isShowLabels: isShowLabels,
        initFromDate: _initFromDate,
        initToDate: _initToDate,
        onTestDate: _onTestDate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowText.default, {
      isShowLabels: isShowLabels,
      textStyle: S_ITEM_TEXT,
      caption: "Source:",
      text: dataSource
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages.default, {
      validationMessages: validationMessages
    })]
  });
});

/*
LoadItemDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    fromDate: PropTypes.string,
    initToDate: PropTypes.string,
    onTestDate: PropTypes.func
  }),
  onClose: PropTypes.func
}
*/
var _default = exports.default = LoadItemDialog;
//# sourceMappingURL=LoadItemDialog.js.map