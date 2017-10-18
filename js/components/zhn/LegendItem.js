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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    display: 'inline-block',
    border: '1px solid',
    borderRadius: '10px',
    //marginLeft : '18px',
    //marginLeft : '8px',
    marginLeft: '12px',
    marginTop: '10px',
    cursor: 'pointer'
  },
  ITEM: {
    display: 'inline-block',
    paddingLeft: '5px',
    //paddingRight : '20px'
    paddingRight: '6px'
  },
  CIRCLE: {
    display: 'inline-block',
    //marginLeft : '15px',
    marginLeft: '6px',
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
          color = item.color,
          name = item.name,
          isVisible = this.state.isVisible,
          _styleRoot = isVisible ? { color: color, borderColor: color, borderWidth: '2px', fontWeight: 'bold' } : { color: color, borderColor: 'gray', borderWidth: '1px', fontWeight: 'normal' },
          _styleCircle = isVisible ? { backgroundColor: color, borderColor: color } : { backgroundColor: 'gray', borderColor: 'gray' };

      return _react2.default.createElement(
        'span',
        {
          style: (0, _extends3.default)({}, S.ROOT, _styleRoot),
          onClick: this._handleClickItem
        },
        _react2.default.createElement('span', { style: (0, _extends3.default)({}, S.CIRCLE, _styleCircle) }),
        _react2.default.createElement(
          'span',
          {
            style: S.ITEM
          },
          name
        )
      );
    }
  }]);
  return LegendItem;
}(_react.Component), _class.defaultProps = {
  item: {}
}, _temp);
exports.default = LegendItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\LegendItem.js.map