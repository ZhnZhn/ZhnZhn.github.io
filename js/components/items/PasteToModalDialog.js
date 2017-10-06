'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _SeriesPane = require('./SeriesPane');

var _SeriesPane2 = _interopRequireDefault(_SeriesPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  MODAL: {
    position: 'static',
    width: '380px',
    height: '340px',
    //minHeight: '200px',
    margin: '70px auto 0px'
  },
  SCROLL_PANE: {
    overflowY: 'auto',
    height: '250px',
    paddingRight: '10px'
  }
};

var PasteToModalDialog = function (_Component) {
  (0, _inherits3.default)(PasteToModalDialog, _Component);

  function PasteToModalDialog() {
    (0, _classCallCheck3.default)(this, PasteToModalDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PasteToModalDialog.__proto__ || Object.getPrototypeOf(PasteToModalDialog)).call(this));

    _this._handlePasteTo = function () {
      var _this$props = _this.props,
          _this$props$data = _this$props.data,
          data = _this$props$data === undefined ? {} : _this$props$data,
          onClose = _this$props.onClose,
          toChart = data.toChart,
          ChartFn = data.ChartFn;


      _this.seriesPaneComp.getValues().forEach(function (conf) {
        var color = conf.color,
            _conf$toYAxis = conf.toYAxis,
            toYAxis = _conf$toYAxis === undefined ? {} : _conf$toYAxis,
            data = conf.data;

        ChartFn.addDataToYAxis(toChart, color, data, toYAxis.value);
      });

      onClose();
    };

    _this._commandButtons = [_react2.default.createElement(_FlatButton2.default, {
      caption: 'Paste & Close',
      isPrimary: true,
      onClick: _this._handlePasteTo
    })];
    return _this;
  }

  (0, _createClass3.default)(PasteToModalDialog, [{
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
      var _this2 = this;

      var _props = this.props,
          isShow = _props.isShow,
          _props$data = _props.data,
          data = _props$data === undefined ? {} : _props$data,
          onClose = _props.onClose,
          fromChart = data.fromChart,
          toChart = data.toChart;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          style: S.MODAL,
          caption: 'Paste Series To',
          isShow: isShow,
          commandButtons: this._commandButtons,
          onClose: onClose
        },
        _react2.default.createElement(_SeriesPane2.default, {
          ref: function ref(comp) {
            return _this2.seriesPaneComp = comp;
          },
          rootStyle: S.SCROLL_PANE,
          fromChart: fromChart,
          toChart: toChart
        })
      );
    }
  }]);
  return PasteToModalDialog;
}(_react.Component);

exports.default = PasteToModalDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\PasteToModalDialog.js.map