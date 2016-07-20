'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var LegendItem = _react2.default.createClass({
  displayName: 'LegendItem',
  getInitialState: function getInitialState() {
    return {
      isVisible: this.props.item.isVisible
    };
  },
  _handlerClickItem: function _handlerClickItem() {
    var _props = this.props;
    var item = _props.item;
    var onClickItem = _props.onClickItem;

    onClickItem(item.index);
    this.setState({ isVisible: !this.state.isVisible });
  },

  //borderColor: '#a487d4'
  render: function render() {
    var item = this.props.item;
    var isVisible = this.state.isVisible;
    var _styleRoot = isVisible ? { color: item.color, borderColor: item.color, borderWidth: '2px', fontWeight: 'bold' } : { color: item.color, borderColor: 'gray', borderWidth: '1px', fontWeight: 'normal' };
    var _styleCircle = isVisible ? { backgroundColor: item.color, borderColor: item.color } : { backgroundColor: 'gray', borderColor: 'gray' };
    return _react2.default.createElement(
      'span',
      {
        style: Object.assign({}, Style.ROOT, _styleRoot),
        onClick: this._handlerClickItem
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
});

exports.default = LegendItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\LegendItem.js.map