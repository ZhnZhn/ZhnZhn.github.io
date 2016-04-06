'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OpenClose = require('./OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuPart = _react2.default.createClass({
  displayName: 'MenuPart',
  _renderMenuItems: function _renderMenuItems(items) {
    return items.map(function (item, index) {
      var className = index % 2 ? 'row__topic__even' : 'row__topic__odd';
      return _react2.default.createElement(
        'div',
        { key: index, className: className, onClick: item.onClick },
        item.title
      );
    });
  },
  render: function render() {
    var _props = this.props;
    var caption = _props.caption;
    var items = _props.items;

    return _react2.default.createElement(
      _OpenClose2.default,
      { caption: caption },
      this._renderMenuItems(items)
    );
  }
});

exports.default = MenuPart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\MenuPart.js.map