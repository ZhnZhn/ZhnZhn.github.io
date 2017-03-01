'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  CAPTION: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

var ItemOption = function ItemOption(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === undefined ? {} : _ref$item,
      propCaption = _ref.propCaption;
  return _react2.default.createElement(
    'div',
    { style: S.CAPTION },
    item[propCaption]
  );
};

exports.default = ItemOption;
//# sourceMappingURL=ItemOption.js.map