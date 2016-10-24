'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemOption = require('./ItemOption');

var _ItemOption2 = _interopRequireDefault(_ItemOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  TOPIC: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'rgb(164, 135, 212)'
  }
};

var ItemTopicOption = function ItemTopicOption(props) {
  var item = props.item;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_ItemOption2.default, props),
    _react2.default.createElement(
      'div',
      { style: STYLE.TOPIC },
      item.topic
    )
  );
};

exports.default = ItemTopicOption;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-select\ItemTopicOption.js.map