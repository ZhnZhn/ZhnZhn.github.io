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

var _class, _temp;

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
    width: 365,
    height: 340,
    margin: '70px auto 0px'
  },
  SCROLL_PANE: {
    overflowY: 'auto',
    height: 250,
    paddingRight: 10
  }
};

var PasteToModalDialog = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(PasteToModalDialog, _Component);

  function PasteToModalDialog(props) {
    (0, _classCallCheck3.default)(this, PasteToModalDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PasteToModalDialog.__proto__ || Object.getPrototypeOf(PasteToModalDialog)).call(this, props));

    _this._hPasteTo = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onClose = _this$props.onClose,
          toChart = data.toChart;

      if (toChart) {
        _this._compSeries.getValues().forEach(function (conf) {
          //color, data, userMin, userMax, yIndex
          toChart.zhAddSeriaToYAxis(conf);
        });
      }
      onClose();
    };

    _this._refCompSeries = function (comp) {
      return _this._compSeries = comp;
    };

    _this._commandButtons = [_react2.default.createElement(_FlatButton2.default, {
      key: 'paste',
      caption: 'Paste & Close',
      isPrimary: true,
      onClick: _this._hPasteTo
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
      var _props = this.props,
          isShow = _props.isShow,
          data = _props.data,
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
          ref: this._refCompSeries,
          rootStyle: S.SCROLL_PANE,
          fromChart: fromChart,
          toChart: toChart
        })
      );
    }
  }]);
  return PasteToModalDialog;
}(_react.Component), _class.defaultProps = {
  data: {}
}, _temp);
exports.default = PasteToModalDialog;
//# sourceMappingURL=PasteToModalDialog.js.map