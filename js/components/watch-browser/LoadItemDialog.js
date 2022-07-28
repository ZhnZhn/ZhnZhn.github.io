"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _DateUtils = require("../../utils/DateUtils");

var _formatNumber = _interopRequireDefault(require("../../utils/formatNumber"));

var _has = _interopRequireDefault(require("../has"));

var _ChartActions = require("../../flux/actions/ChartActions");

var _LoadType = require("../../constants/LoadType");

var _BrowserType = require("../../constants/BrowserType");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
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

  return ((0, _formatNumber.default)(y) + " " + (0, _DateUtils.mlsToDmy)(x)).trim();
};

const HAS_WIDE_WIDTH = _has.default.wideWidth(),
      DF_DATA = {},
      DF_FROM_DATE = (0, _DateUtils.getFromDate)(2),
      DF_TO_DATE = (0, _DateUtils.getToDate)();

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
        [isShowLabels, _toggleIsShowLabels] = (0, _useToggle.default)(HAS_WIDE_WIDTH),
        [isValue, _toggleIsValue] = (0, _useToggle.default)(_isNumber(x)),
        [isShowDate, _toggleIsShowDate] = (0, _useToggle.default)(),
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
        itemConf = {} //_itemKey, url, loadId,
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

      _ChartActions.ChartActions[_ChartActions.CHAT_LOAD]({
        chartType: _LoadType.LT_WATCH_LIST,
        browserType: _BrowserType.BT_WATCH_LIST
      }, option);

      onClose();
      setValidationMessages(prevVms => prevVms.length > 0 ? [] : prevVms);
    } else {
      setValidationMessages(_validationMessages);
    }
  },
        _commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Load, {
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
        _onTestDate = onTestDate || _DateUtils.isYmd,
        _style = isShowLabels ? S_DIALOG : S_DIALOG_SHORT,
        _value = _crValue(x, y);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    style: _style,
    isShow: isShow,
    caption: "Load Item",
    commandButtons: _commandButtons,
    onClose: _hClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: true,
      buttons: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Row.Text, {
      isShowLabels: isShowLabels,
      styleText: S_ITEM_TEXT,
      caption: "Item:",
      text: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isValue,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Row.Text, {
        isShowLabels: isShowLabels,
        styleText: S_ITEM_TEXT,
        caption: "Value:",
        text: _value
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.ShowHide, {
      isShow: isShowDate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.DatesFragment, {
        ref: _refDates,
        isShowLabels: isShowLabels,
        initFromDate: _initFromDate,
        initToDate: _initToDate,
        onTestDate: _onTestDate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Row.Text, {
      isShowLabels: isShowLabels,
      styleText: S_ITEM_TEXT,
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
  store: PropTypes.object,
  onClose: PropTypes.func
}
*/

var _default = LoadItemDialog;
exports.default = _default;
//# sourceMappingURL=LoadItemDialog.js.map