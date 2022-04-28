"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _DateUtils = require("../../utils/DateUtils");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _ZoomDailyRow = _interopRequireDefault(require("./ZoomDailyRow"));

var _jsxRuntime = require("react/jsx-runtime");

const S_DIALOG = {
  width: 244,
  marginLeft: -122
},
      S_DATE = {
  width: 120
};

const _isFn = fn => typeof fn === 'function';

const _getFromToDates = chart => {
  var _chart$zhGetFromToDat;

  return (_chart$zhGetFromToDat = chart.zhGetFromToDates == null ? void 0 : chart.zhGetFromToDates({
    format: _DateUtils.mlsToDmy
  })) != null ? _chart$zhGetFromToDat : {};
};

const _getMinYear = strDmy => strDmy.split('-')[2];

const _crErrMsg = minYear => "DD-MM-YYYY format must be, min 01-01-" + minYear;

class ZoomDialog extends _react.Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */
  constructor(props) {
    super(props);

    this._getChart = () => {
      const {
        data,
        onClose
      } = this.props,
            {
        chart = {}
      } = data;
      return {
        chart,
        onClose
      };
    };

    this._hZoom = () => {
      const {
        chart,
        onClose
      } = this._getChart();

      if (_isFn(chart.zhZoomX) && this._dates.getValidation().isValid) {
        const {
          fromDate,
          toDate
        } = this._dates.getValues(),
              from = (0, _DateUtils.dmyToUTC)(fromDate),
              to = (0, _DateUtils.dmyToUTC)(toDate);

        chart.zhZoomX({
          from,
          to
        });
      }

      onClose();
    };

    this._hZoomBy = month => {
      const {
        chart
      } = this._getChart();

      if (_isFn(chart.zhZoomX)) {
        const {
          to
        } = _getFromToDates(chart),
              _fromMls = (0, _DateUtils.addToDmy)(to, month).getTime(),
              _toMls = (0, _DateUtils.dmyToUTC)(to);

        if (chart.zhZoomX({
          from: _fromMls,
          to: _toMls
        })) {
          this._dates.setFromTo((0, _DateUtils.mlsToDmy)(_fromMls), to);
        }
      }
    };

    this._hZoomYTD = () => {
      const {
        chart
      } = this._getChart();

      if (_isFn(chart.zhZoomX)) {
        const {
          to
        } = _getFromToDates(chart),
              _fromMls = (0, _DateUtils.getYTDfromDmy)(to),
              _toMls = (0, _DateUtils.dmyToUTC)(to);

        if (chart.zhZoomX({
          from: _fromMls,
          to: _toMls
        })) {
          this._dates.setFromTo((0, _DateUtils.mlsToDmy)(_fromMls), to);
        }
      }
    };

    this._refDates = c => this._dates = c;

    this._hZoom1M = this._hZoomBy.bind(null, -1);
    this._hZoom3M = this._hZoomBy.bind(null, -3);
    this._hZoom6M = this._hZoomBy.bind(null, -6);
    this._hZoom1Y = this._hZoomBy.bind(null, -12);
    this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Flat, {
      caption: "Zoom",
      isPrimary: true,
      onClick: this._hZoom
    }, "zoom")];
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
      data,
      onClose
    } = this.props,
          {
      chart = {}
    } = data,
          {
      from,
      to
    } = _getFromToDates(chart),
          _minYear = _getMinYear(from),
          _onTestDate = str => (0, _DateUtils.isDmy)(str, _minYear),
          _errMsgDateFrom = _crErrMsg(_minYear),
          id = chart.zhGetId == null ? void 0 : chart.zhGetId(),
          _isDaily = chart.zhIsDaily == null ? void 0 : chart.zhIsDaily();

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
      caption: "Zoom Chart",
      style: S_DIALOG,
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.DatesFragment, {
        ref: this._refDates,
        dateStyle: S_DATE,
        placeholder: "DD-MM-YYYY",
        initFromDate: from,
        initToDate: to,
        errMsg: _errMsgDateFrom,
        isPeriodValid: _DateUtils.isDmyPeriod,
        onTestDate: _onTestDate,
        onEnter: this._hZoom
      }, id), _isDaily && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ZoomDailyRow.default, {
        onZoom1M: this._hZoom1M,
        onZoom3M: this._hZoom3M,
        onZoom6M: this._hZoom6M,
        onZoomYTD: this._hZoomYTD,
        onZoom1Y: this._hZoom1Y
      })]
    });
  }

}

ZoomDialog.defaultProps = {
  data: {}
};
var _default = ZoomDialog;
exports.default = _default;
//# sourceMappingURL=ZoomDialog.js.map