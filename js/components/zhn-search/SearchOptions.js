'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ROOT: 'zhn-search__options',
  OPTIONS: 'zhn-search__options__div',
  ITEM: 'zhn-search__row',
  FOOTER: 'zhn-search__footer'
};

var S = {
  HIDE: {
    display: 'none'
  },
  OPTIONS: {
    width: 250
  },
  BOLD: {
    fontWeight: 'bold'
  },
  FOOTER: {
    width: 250,
    height: 32,
    color: 'gray',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 4,
    paddingBottom: 4
  }
};

var BoldSpan = function BoldSpan(_ref) {
  var _ref$text = _ref.text,
      text = _ref$text === undefined ? '' : _ref$text;
  return _react2.default.createElement(
    'span',
    { style: S.BOLD },
    text
  );
};
var Delimeter = function Delimeter() {
  return _react2.default.createElement(
    'span',
    null,
    ' - '
  );
};
var Span = function Span(_ref2) {
  var _ref2$text = _ref2.text,
      text = _ref2$text === undefined ? '' : _ref2$text;
  return _react2.default.createElement(
    'span',
    null,
    text
  );
};

var Item = function Item(_ref3) {
  var item = _ref3.item,
      onClick = _ref3.onClick,
      onFocus = _ref3.onFocus;
  var value = item.value,
      name = item.name,
      type = item.type,
      region = item.region,
      currency = item.currency;

  return _react2.default.createElement(
    'button',
    {
      className: CL.ITEM,
      onClick: onClick,
      onFocus: onFocus
    },
    _react2.default.createElement(BoldSpan, { text: value }),
    _react2.default.createElement(Delimeter, null),
    _react2.default.createElement(Span, { text: name }),
    _react2.default.createElement(Delimeter, null),
    _react2.default.createElement(BoldSpan, { text: type }),
    _react2.default.createElement(Delimeter, null),
    _react2.default.createElement(Span, { text: region }),
    _react2.default.createElement(Delimeter, null),
    _react2.default.createElement(BoldSpan, { text: currency })
  );
};

var SearchOptions = function SearchOptions(_ref4) {
  var isShow = _ref4.isShow,
      options = _ref4.options,
      onClickItem = _ref4.onClickItem;

  var refRecentItem = (0, _react.useRef)();

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      itemIndex = _useState2[0],
      setItemIndex = _useState2[1];

  var _onFocusItem = function _onFocusItem(index, event) {
    refRecentItem.current = event.target;
    setItemIndex(index);
  };
  (0, _react.useEffect)(function () {
    refRecentItem.current = null;
    setItemIndex('');
  }, [options]);
  (0, _react.useEffect)(function () {
    if (isShow && refRecentItem.current) {
      refRecentItem.current.focus();
    }
  }, [isShow]);

  var _style = isShow ? null : S.HIDE;
  var _total = options.length || '';

  return _react2.default.createElement(
    'div',
    {
      className: CL.ROOT,
      style: (0, _extends3.default)({}, S.OPTIONS, _style)
    },
    _react2.default.createElement(
      'div',
      { className: CL.OPTIONS, style: S.OPTIONS },
      options.map(function (item, index) {
        return _react2.default.createElement(Item, {
          key: item.value + index,
          item: item,
          onClick: onClickItem.bind(null, item.value),
          onFocus: _onFocusItem.bind(null, index + 1)
        });
      })
    ),
    _react2.default.createElement(
      'div',
      { className: CL.FOOTER, style: S.FOOTER },
      _react2.default.createElement(
        'span',
        null,
        itemIndex,
        ':'
      ),
      _react2.default.createElement(
        'span',
        null,
        _total
      )
    )
  );
};

exports.default = SearchOptions;
//# sourceMappingURL=SearchOptions.js.map