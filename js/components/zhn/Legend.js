'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LegendItem = require('./LegendItem');

var _LegendItem2 = _interopRequireDefault(_LegendItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Style = {
  ITEM: {
    display: 'inline-block',
    border: '2px solid',
    borderRadius: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginLeft: '10px',
    cursor: 'pointer'
  }
};

var Legend = _react2.default.createClass({
  displayName: 'Legend',
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.legend === this.props.legend) {
      return false;
    }
    return true;
  },
  _renderLegend: function _renderLegend() {
    var legend = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var onClickItem = arguments[1];

    return legend.map(function (item, index) {
      return _react2.default.createElement(_LegendItem2.default, { key: item.name, item: item, onClickItem: onClickItem });
    });
  },
  render: function render() {
    var _props = this.props;
    var legend = _props.legend;
    var onClickItem = _props.onClickItem;

    return _react2.default.createElement(
      'div',
      null,
      this._renderLegend(legend, onClickItem)
    );
  }
});

exports.default = Legend;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\Legend.js.map