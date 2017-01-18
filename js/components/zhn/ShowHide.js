'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  }
};

var ShowHide = _react2.default.createClass({
  displayName: 'ShowHide',
  render: function render() {
    var _props = this.props,
        isShow = _props.isShow,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        _styleShow = isShow ? styles.show : styles.hide,
        _classShow = isShow ? 'show-popup' : '',
        _className = className ? className + ' ' + _classShow : _classShow !== '' ? _classShow : undefined;

    return _react2.default.createElement(
      'div',
      {
        className: _className,
        style: Object.assign({}, style, _styleShow)
      },
      children
    );
  }
});

exports.default = ShowHide;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ShowHide.js.map