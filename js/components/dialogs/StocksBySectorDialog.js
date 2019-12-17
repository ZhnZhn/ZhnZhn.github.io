"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ChartActions = _interopRequireDefault(require("../../flux/actions/ChartActions"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _NasdaqLink = _interopRequireDefault(require("../native-links/NasdaqLink"));

//import PropTypes from "prop-types";
var S = {
  ROOT_NOT_LABELS: {
    width: 280
  },
  CAPTION_SPAN: {
    display: 'inline-block',
    maxWidth: 295
  },
  SOURCE_ROOT: {
    lineHeight: 1.5,
    marginBottom: 0
  },
  LINK_SHOW_HIDE: {
    marginBottom: 10
  },
  LINK_ROOT: {
    marginTop: 8,
    marginBottom: 0,
    lineHeight: 1.5,
    fontWeight: 'bold'
  },
  LINK_CAPTION: {
    color: '#1b75bb',
    display: 'inline-block',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: '16px'
  },
  LINK: {
    paddingTop: 0
  },
  LINK_NOT_LABELS: {
    marginLeft: 8
  }
};
var IEX_SOURCES = [{
  a: '1 Month',
  b: '1m'
}, {
  a: '3 Months',
  b: '3m'
}, {
  a: '6 Months',
  b: '6m'
}, {
  a: '1 Year',
  b: '1y'
}, {
  a: '2 Years',
  b: '2y'
}].map(function (_ref) {
  var a = _ref.a,
      b = _ref.b;
  return {
    caption: 'IEX Cloud: ' + a,
    value: 'IEX',
    dfProps: {
      dfType: 'chart',
      dfPeriod: b
    }
  };
});
var SOURCE_OPTIONS = [{
  caption: 'Alpha Vantage: Daily (100)',
  value: 'AL_I',
  dfProps: {
    indicator: 'TIME_SERIES_DAILY',
    interval: 'Daily',
    outputsize: 'compact'
  }
}, {
  caption: 'Barchart: 6 Months',
  value: 'B'
}].concat(IEX_SOURCES);
var DF_SOURCE = SOURCE_OPTIONS[0];

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _getItemId = function _getItemId(props) {
  return ((props.data || {}).item || {}).id;
};

var _createInitialState = function _createInitialState(props) {
  return {
    itemId: _getItemId(props),
    isShowLink: false
  };
};

var StocksBySectorDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(StocksBySectorDialog, _Component);

  /*
   static propTypes = {
     isShow: PropTypes.bool,
     data: PropTypes.object,
     store: PropTypes.object,
     onClose: PropTypes.func
   }
  */
  function StocksBySectorDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hClickLabels = function () {
      _this.setState(function (prevState) {
        return {
          isShowLabels: !prevState.isShowLabels
        };
      });
    };

    _this._hClickLink = function () {
      _this.setState(function (prevState) {
        return {
          isShowLink: !prevState.isShowLink
        };
      });
    };

    _this._hShow = function () {
      var data = _this.props.data;

      if (data && _isFn(data.onShow)) {
        data.onShow();
      }
    };

    _this._hSelectDataSource = function (item) {
      _this._dataSource = item;
    };

    _this._getDataSource = function () {
      return _this._dataSource || DF_SOURCE;
    };

    _this._hLoad = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          _data$item = data.item,
          item = _data$item === void 0 ? {} : _data$item,
          browserType = data.browserType,
          chartContainerType = data.chartContainerType,
          dialogProps = data.dialogProps,
          id = item.id,
          text = item.text,
          _this$_getDataSource = _this._getDataSource(),
          caption = _this$_getDataSource.caption,
          value = _this$_getDataSource.value,
          dfProps = _this$_getDataSource.dfProps;

      _ChartActions["default"].loadStock({
        chartType: chartContainerType,
        browserType: browserType
      }, (0, _extends2["default"])({
        title: text,
        value: id,
        ticket: id,
        item: item,
        loadId: value,
        id: id,
        linkFn: 'NASDAQ',
        dataSource: caption
      }, dialogProps, {}, dfProps));

      onClose();
    };

    _this.toolbarButtons = [{
      caption: 'L',
      title: 'Click to toggle labels',
      onClick: _this._hClickLabels
    }, {
      caption: 'O',
      title: 'Click to toggle options',
      onClick: _this._hClickLink
    }];
    _this._commandButtons = [_react["default"].createElement(_DialogCell["default"].Button.Load, {
      key: "load",
      onClick: _this._hLoad
    }), _react["default"].createElement(_DialogCell["default"].Button.Show, {
      key: "show",
      onClick: _this._hShow
    })];
    _this.state = (0, _extends2["default"])({}, _createInitialState(props), {
      isShowLabels: true
    });
    return _this;
  }

  StocksBySectorDialog.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (_getItemId(nextProps) !== prevState.itemId) {
      return _createInitialState(nextProps);
    }

    return null;
  };

  var _proto = StocksBySectorDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        data = _this$props2.data,
        onClose = _this$props2.onClose,
        _ref2 = data || {},
        item = _ref2.item,
        _ref3 = item || {},
        text = _ref3.text,
        _this$state = this.state,
        isShowLabels = _this$state.isShowLabels,
        isShowLink = _this$state.isShowLink,
        _style = isShowLabels ? null : S.ROOT_NOT_LABELS,
        _linkStyle = isShowLabels ? S.LINK : (0, _extends2["default"])({}, S.LINK, {}, S.LINK_NOT_LABELS);

    return _react["default"].createElement(_ModalDialog["default"], {
      caption: text,
      style: _style,
      styleCaption: S.CAPTION_SPAN,
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: onClose
    }, _react["default"].createElement(_DialogCell["default"].ToolbarButtonCircle, {
      buttons: this.toolbarButtons
    }), _react["default"].createElement(_DialogCell["default"].RowInputSelect, {
      isShowLabels: isShowLabels,
      caption: "Source",
      placeholder: DF_SOURCE.caption,
      options: SOURCE_OPTIONS,
      onSelect: this._hSelectDataSource
    }), _react["default"].createElement(_DialogCell["default"].ShowHide, {
      isShow: isShowLink,
      style: S.LINK_SHOW_HIDE
    }, _react["default"].createElement(_DialogCell["default"].Row.Plain, {
      style: S.LINK_ROOT
    }, isShowLabels && _react["default"].createElement("span", {
      style: S.LINK_CAPTION
    }, "Link:"), _react["default"].createElement(_NasdaqLink["default"], {
      style: _linkStyle,
      item: item,
      caption: "NASDAQ"
    }))));
  };

  return StocksBySectorDialog;
}(_react.Component);

var _default = StocksBySectorDialog;
exports["default"] = _default;
//# sourceMappingURL=StocksBySectorDialog.js.map