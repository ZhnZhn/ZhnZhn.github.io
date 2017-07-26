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

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

var _TabPane = require('../zhn/TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _Tab = require('../zhn/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _ChartPane = require('./ChartPane');

var _ChartPane2 = _interopRequireDefault(_ChartPane);

var _SeriaPane = require('./SeriaPane');

var _SeriaPane2 = _interopRequireDefault(_SeriaPane);

var _XAxisPane = require('./XAxisPane');

var _XAxisPane2 = _interopRequireDefault(_XAxisPane);

var _YAxisPane = require('./YAxisPane');

var _YAxisPane2 = _interopRequireDefault(_YAxisPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  TITLE: {
    paddingTop: '12px',
    paddingBottom: '6px',
    paddingLeft: '12px',
    color: '#a487d4',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var ChartConfigDialog = function (_Component) {
  (0, _inherits3.default)(ChartConfigDialog, _Component);

  function ChartConfigDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ChartConfigDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ChartConfigDialog.__proto__ || Object.getPrototypeOf(ChartConfigDialog)).call.apply(_ref, [this].concat(args))), _this), _this._handleClose = function () {
      _this.props.onClose();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ChartConfigDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow && nextProps.optionData === this.props.optionData) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          _props$optionData = _props.optionData,
          optionData = _props$optionData === undefined ? {} : _props$optionData,
          onFront = _props.onFront,
          caption = optionData.caption,
          chart = optionData.chart;


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          isShow: isShow,
          caption: 'Configure Chart',
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(
          'div',
          { style: STYLE.TITLE },
          caption
        ),
        _react2.default.createElement(
          _TabPane2.default,
          { isUpdateInit: true },
          _react2.default.createElement(
            _Tab2.default,
            { title: 'Chart' },
            _react2.default.createElement(_ChartPane2.default, optionData)
          ),
          _react2.default.createElement(
            _Tab2.default,
            { title: 'Seria' },
            _react2.default.createElement(_SeriaPane2.default, { chart: chart })
          ),
          _react2.default.createElement(
            _Tab2.default,
            { title: 'XAxis' },
            _react2.default.createElement(_XAxisPane2.default, { chart: chart })
          ),
          _react2.default.createElement(
            _Tab2.default,
            { title: 'YAxis' },
            _react2.default.createElement(_YAxisPane2.default, { chart: chart })
          )
        )
      );
    }
  }]);
  return ChartConfigDialog;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ChartConfigDialog.propTypes = {
  isShow: _react.PropTypes.bool,
  optionData: _react.PropTypes.shape({
    caption: _react.PropTypes.string,
    chart: _react.PropTypes.object,
    setItemCaption: _react.PropTypes.func,
    onToggleToolbar: _react.PropTypes.func
  }),
  onClose: _react.PropTypes.func
} : void 0;
exports.default = ChartConfigDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\ChartConfigDialog.js.map