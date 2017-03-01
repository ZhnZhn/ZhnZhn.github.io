'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  _inherits(LegendItem, _Component);

  function LegendItem(props) {
    _classCallCheck(this, LegendItem);

    var _this = _possibleConstructorReturn(this, (LegendItem.__proto__ || Object.getPrototypeOf(LegendItem)).call(this));

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

  _createClass(LegendItem, [{
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