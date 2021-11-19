"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _formatNumber = _interopRequireDefault(require("../../utils/formatNumber"));

var _ChartActions = _interopRequireWildcard(require("../../flux/actions/ChartActions"));

var _Type = require("../../constants/Type");

var _ChartType = _interopRequireDefault(require("../../constants/ChartType"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));

var _Decorators = _interopRequireDefault(require("../dialogs/decorators/Decorators"));

var _jsxRuntime = require("react/jsx-runtime");

var _dec, _class, _class2, _temp;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  getFromDate,
  getToDate,
  isYmd,
  mlsToDmy
} = _DateUtils.default;
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
  verticalAlign: 'middle',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
};

const _crValue = (x = '', y = '') => ((0, _formatNumber.default)(y) + " " + mlsToDmy(x)).trim();

let LoadItemDialog = (_dec = _Decorators.default.dialog, _dec(_class = (_temp = _class2 = class LoadItemDialog extends _react.Component {
  /*
  static propTypes = {
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
  constructor(props) {
    super(props);

    this._handleLoad = () => {
      const validationMessages = this._createValidationMessages();

      if (validationMessages.isValid) {
        const {
          data,
          onClose
        } = this.props,
              {
          id,
          title,
          subtitle,
          caption,
          columnName,
          dataColumn,
          seriaColumnNames,
          itemConf = {}
          /*
          _itemKey, url, loadId,
          optionFetch, items,
          itemCaption, seriaType,
          dataSource, dfId, timeId
          */

        } = data,
              {
          fromDate,
          toDate
        } = this.datesFragment.getValues(),
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
          loadId: itemConf.loadId || _Type.LoadType.WL,
          ...itemConf
        };

        _ChartActions.default[_ChartActions.CHAT_LOAD]({
          chartType: _ChartType.default.WATCH_LIST,
          browserType: _Type.BrowserType.WATCH_LIST
        }, option);

        onClose();
      }

      this._updateValidationMessages(validationMessages);
    };

    this._createValidationMessages = () => {
      let msg = [];
      const {
        isValid,
        datesMsg
      } = this.datesFragment.getValidation();

      if (!isValid) {
        msg = msg.concat(datesMsg);
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    this._handleClose = () => {
      this._handleWithValidationClose(this._createValidationMessages);

      this.props.onClose();
    };

    this._refDates = c => this.datesFragment = c;

    const {
      fromDate: _fromDate,
      initToDate,
      onTestDate,
      itemConf: _itemConf = {}
    } = props.data,
          isValue = !!_itemConf.x;
    this.toolbarButtons = this._createType2WithToolbar(props, {
      isValue
    });
    this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Load, {
      onClick: this._handleLoad
    }, "load")];
    this.state = { ...this._isWithInitialState(),
      isShowDate: false,
      isValue,
      initFromDate: _fromDate || getFromDate(2),
      initToDate: initToDate || getToDate(),
      onTestDate: onTestDate || isYmd
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  }

  render() {
    const {
      isShow,
      data
    } = this.props,
          {
      caption,
      itemConf = {}
    } = data,
          {
      dataSource,
      x,
      y
    } = itemConf,
          {
      isShowLabels,
      isShowDate,
      isValue,
      initFromDate,
      initToDate,
      onTestDate,
      validationMessages
    } = this.state,
          _style = isShowLabels ? S_DIALOG : S_DIALOG_SHORT,
          _value = _crValue(x, y);

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
      style: _style,
      isShow: isShow,
      caption: "Load Item",
      commandButtons: this._commandButtons,
      onClose: this._handleClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
        isShow: true,
        buttons: this.toolbarButtons
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
          ref: this._refDates,
          isShowLabels: isShowLabels,
          initFromDate: initFromDate,
          initToDate: initToDate,
          onTestDate: onTestDate
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
  }

}, _class2.defaultProps = {
  data: {}
}, _temp)) || _class);
var _default = LoadItemDialog;
exports.default = _default;
//# sourceMappingURL=LoadItemDialog.js.map