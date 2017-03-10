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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Style = {
  ROOT: {
    display: 'inline-block',
    border: '1px solid',
    borderRadius: '10px',
    marginLeft: '18px',
    marginTop: '10px',
    cursor: 'pointer'
  },
  ITEM: {
    display: 'inline-block',
    paddingLeft: '5px',
    paddingRight: '20px'
  },
  CIRCLE: {
    display: 'inline-block',
    marginLeft: '15px',
    backgroundColor: 'gray',
    width: '12px',
    height: '12px',
    border: '1px solid gray',
    borderRadius: '50%'
  }
};

var LegendItem = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(LegendItem, _Component);

  function LegendItem(props) {
    (0, _classCallCheck3.default)(this, LegendItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LegendItem.__proto__ || Object.getPrototypeOf(LegendItem)).call(this));

    _this._handleClickItem = function () {
      var _this$props = _this.props,
          item = _this$props.item,
          onClickItem = _this$props.onClickItem;

      onClickItem(item);
      _this.setState({ isVisible: !_this.state.isVisible });
    };

    _this.state = {
      isVisible: props.item.isVisible
    };
    return _this;
  }

  (0, _createClass3.default)(LegendItem, [{
    key: 'render',
    value: function render() {
      var item = this.props.item,
          isVisible = this.state.isVisible,
          _styleRoot = isVisible ? { color: item.color, borderColor: item.color, borderWidth: '2px', fontWeight: 'bold' } : { color: item.color, borderColor: 'gray', borderWidth: '1px', fontWeight: 'normal' },
          _styleCircle = isVisible ? { backgroundColor: item.color, borderColor: item.color } : { backgroundColor: 'gray', borderColor: 'gray' };

      return _react2.default.createElement(
        'span',
        {
          style: Object.assign({}, Style.ROOT, _styleRoot),
          onClick: this._handleClickItem
        },
        _react2.default.createElement('span', { style: Object.assign({}, Style.CIRCLE, _styleCircle) }),
        _react2.default.createElement(
          'span',
          {
            style: Style.ITEM
          },
          item.name
        )
      );
    }
  }]);
  return LegendItem;
}(_react.Component), _class.defaultProps = {
  item: {}
}, _temp);
exports.default = LegendItem;
//# sourceMappingURL=LegendItem.js.map