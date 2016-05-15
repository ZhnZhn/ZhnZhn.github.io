'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuBadge = require('./MenuBadge');

var _MenuBadge2 = _interopRequireDefault(_MenuBadge);

var _OpenClose = require('./OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuPart = _react2.default.createClass({
  displayName: 'MenuPart',
  _renderMenuItems: function _renderMenuItems(items) {
    return items.map(function (item, index) {
      var className = index % 2 ? 'row__topic__even not-selected' : 'row__topic__odd not-selected';
      var menuBadge = item.counter !== 0 ? _react2.default.createElement(_MenuBadge2.default, {
        counter: item.counter,
        isOpen: item.isOpen,
        onClick: item.onBadgeClick,
        onBadgeClose: item.onBadgeClose
      }) : null;
      return _react2.default.createElement(
        'div',
        {
          key: index,
          className: className,
          onClick: item.onClick
        },
        item.title,
        menuBadge
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