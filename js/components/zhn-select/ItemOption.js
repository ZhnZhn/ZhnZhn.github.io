'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  CAPTION: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

var ItemOption = function ItemOption(props) {
  var item = props.item;
  var propCaption = props.propCaption;

  return _react2.default.createElement(
    'div',
    { style: STYLE.CAPTION },
    item[propCaption]
  );
};

exports.default = ItemOption;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-select\ItemOption.js.map