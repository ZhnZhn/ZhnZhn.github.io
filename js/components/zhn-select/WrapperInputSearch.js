'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TransformFn = require('./TransformFn');

var _TransformFn2 = _interopRequireDefault(_TransformFn);

var _InputSearch = require('./InputSearch');

var _InputSearch2 = _interopRequireDefault(_InputSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrapperInputSearch = _react2.default.createClass({
  displayName: 'WrapperInputSearch',
  shouldComponentUpdate: function shouldComponentUpdate() {
    return false;
  },
  _handlerSelectItem: function _handlerSelectItem(item) {
    if (item) {
      this.props.onSelect(item);
    }
  },
  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var _props$placeholder = _props.placeholder;
    var placeholder = _props$placeholder === undefined ? '' : _props$placeholder;
    var data = _props.data;
    var ItemOptionComp = _props.ItemOptionComp;
    var meta = data.meta;
    var caption = meta.caption;
    var _options = _TransformFn2.default.fromLevel3(data);

    return _react2.default.createElement(
      'div',
      { style: style },
      _react2.default.createElement(_InputSearch2.default, {
        placeholder: placeholder,
        propCaption: caption,
        options: _options,
        ItemOptionComp: ItemOptionComp,
        onSelect: this._handlerSelectItem
      })
    );
  }
});

exports.default = WrapperInputSearch;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-select\WrapperInputSearch.js.map