'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _DialogCell = require('./DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _NasdaqLink = require('../native-links/NasdaqLink');

var _NasdaqLink2 = _interopRequireDefault(_NasdaqLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    marginTop: 0,
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
  LINK_NOT_LABELS: {
    marginLeft: 8
  }
};

var SOURCE_OPTIONS = [{
  caption: 'Alpha Vantage: Daily (100)',
  value: 'AL_I',
  dfProps: {
    indicator: 'TIME_SERIES_DAILY',
    interval: 'Daily',
    outputsize: 'compact'
  }
}, {
  caption: 'Barchart: 6 Months', value: 'B'
}, {
  caption: 'IEX Platform: 2 Years', value: 'IEX',
  dfProps: {
    dfType: "chart",
    dfPeriod: "2y"
  }
}];

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _getItemId = function _getItemId(props) {
  return props && props.data && props.data.item && props.data.item.id;
};

var _createInitialState = function _createInitialState(props) {
  var itemId = _getItemId(props);
  return {
    itemId: itemId,
    isShowLink: false
  };
};

var StocksBySectorDialog = function (_Component) {
  (0, _inherits3.default)(StocksBySectorDialog, _Component);

  /*
   static propTypes = {
     isShow: PropTypes.bool,
     data: PropTypes.object,
     store: PropTypes.object,
     onClose: PropTypes.func
   }
  */

  function StocksBySectorDialog(props) {
    (0, _classCallCheck3.default)(this, StocksBySectorDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StocksBySectorDialog.__proto__ || Object.getPrototypeOf(StocksBySectorDialog)).call(this, props));

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
      return _this._dataSource || SOURCE_OPTIONS[2];
    };

    _this._hLoad = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          _data$item = data.item,
          item = _data$item === undefined ? {} : _data$item,
          browserType = data.browserType,
          chartContainerType = data.chartContainerType,
          dialogProps = data.dialogProps,
          id = item.id,
          text = item.text,
          _this$_getDataSource = _this._getDataSource(),
          caption = _this$_getDataSource.caption,
          value = _this$_getDataSource.value,
          dfProps = _this$_getDataSource.dfProps;

      _ChartActions2.default.loadStock({
        chartType: chartContainerType, browserType: browserType
      }, (0, _extends3.default)({
        title: text,
        value: id,
        ticket: id,
        item: item,
        loadId: value,
        id: id,
        linkFn: 'NASDAQ',
        dataSource: caption
      }, dialogProps, dfProps));
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
    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, {
      key: 'load',
      onClick: _this._hLoad
    }), _react2.default.createElement(_DialogCell2.default.Button.Show, {
      key: 'show',
      onClick: _this._hShow
    })];
    _this.state = (0, _extends3.default)({}, _createInitialState(props), {
      isShowLabels: true
    });
    return _this;
  }

  (0, _createClass3.default)(StocksBySectorDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          _props$data = _props.data,
          data = _props$data === undefined ? {} : _props$data,
          onClose = _props.onClose,
          _data$item2 = data.item,
          item = _data$item2 === undefined ? {} : _data$item2,
          text = item.text,
          _state = this.state,
          isShowLabels = _state.isShowLabels,
          isShowLink = _state.isShowLink,
          _style = isShowLabels ? null : S.ROOT_NOT_LABELS,
          _linkStyle = isShowLabels ? null : S.LINK_NOT_LABELS;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: text,
          style: _style,
          styleCaption: S.CAPTION_SPAN,
          isShow: isShow,
          commandButtons: this._commandButtons,
          onClose: onClose
        },
        _react2.default.createElement(_DialogCell2.default.ToolbarButtonCircle, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          isShowLabels: isShowLabels,
          caption: 'Source',
          placeholder: 'IEX Platform: 2 Years',
          options: SOURCE_OPTIONS,
          onSelect: this._hSelectDataSource
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowLink, style: S.LINK_SHOW_HIDE },
          _react2.default.createElement(
            _DialogCell2.default.Row.Plain,
            { style: S.LINK_ROOT },
            isShowLabels && _react2.default.createElement(
              'span',
              { style: S.LINK_CAPTION },
              'Link:'
            ),
            _react2.default.createElement(_NasdaqLink2.default, {
              style: _linkStyle,
              item: item,
              caption: 'NASDAQ'
            })
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (_getItemId(nextProps) !== prevState.itemId) {
        return _createInitialState(nextProps);
      }
      return null;
    }
  }]);
  return StocksBySectorDialog;
}(_react.Component);

exports.default = StocksBySectorDialog;
//# sourceMappingURL=StocksBySectorDialog.js.map