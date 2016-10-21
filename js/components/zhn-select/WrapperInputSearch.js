'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
  _createOptions: function _createOptions(data, meta) {
    var level1 = meta.level1;
    var level2 = meta.level2;
    var level3 = meta.level3;
    var _options = [];

    for (var i1 = 0, l1 = data[level1].length; i1 < l1; i1++) {
      var industry = data[level1][i1];
      for (var i2 = 0, l2 = industry[level2].length; i2 < l2; i2++) {
        var sector = industry[level2][i2];
        for (var i3 = 0, l3 = sector[level3].length; i3 < l3; i3++) {
          var item = sector[level3][i3];
          _options.push(item);
        }
      }
    }

    return _options;
  },
  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var _props$placeholder = _props.placeholder;
    var placeholder = _props$placeholder === undefined ? '' : _props$placeholder;
    var data = _props.data;
    var meta = data.meta;
    var caption = meta.caption;
    var _options = this._createOptions(data, meta);

    return _react2.default.createElement(
      'div',
      { style: style },
      _react2.default.createElement(_InputSearch2.default, {
        placeholder: placeholder,
        propCaption: caption,
        options: _options,
        width: 280,
        onSelect: this._handlerSelectItem
      })
    );
  }
});

exports.default = WrapperInputSearch;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-select\WrapperInputSearch.js.map