"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

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
      text = _ref$text === void 0 ? '' : _ref$text;
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: S.BOLD
  }, text);
};

var Delimeter = function Delimeter() {
  return /*#__PURE__*/_react["default"].createElement("span", null, " - ");
};

var Span = function Span(_ref2) {
  var _ref2$text = _ref2.text,
      text = _ref2$text === void 0 ? '' : _ref2$text;
  return /*#__PURE__*/_react["default"].createElement("span", null, text);
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
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: CL.ITEM,
    onClick: onClick,
    onFocus: onFocus
  }, /*#__PURE__*/_react["default"].createElement(BoldSpan, {
    text: value
  }), /*#__PURE__*/_react["default"].createElement(Delimeter, null), /*#__PURE__*/_react["default"].createElement(Span, {
    text: name
  }), /*#__PURE__*/_react["default"].createElement(Delimeter, null), /*#__PURE__*/_react["default"].createElement(BoldSpan, {
    text: type
  }), /*#__PURE__*/_react["default"].createElement(Delimeter, null), /*#__PURE__*/_react["default"].createElement(Span, {
    text: region
  }), /*#__PURE__*/_react["default"].createElement(Delimeter, null), /*#__PURE__*/_react["default"].createElement(BoldSpan, {
    text: currency
  }));
};

var SearchOptions = function SearchOptions(_ref4) {
  var isShow = _ref4.isShow,
      options = _ref4.options,
      onClickItem = _ref4.onClickItem;
  var refRecentItem = (0, _react.useRef)();

  var _useState = (0, _react.useState)(''),
      itemIndex = _useState[0],
      setItemIndex = _useState[1];

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

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: CL.ROOT,
    style: (0, _extends2["default"])({}, S.OPTIONS, _style)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: CL.OPTIONS,
    style: S.OPTIONS
  }, options.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(Item, {
      key: item.value + index,
      item: item,
      onClick: onClickItem.bind(null, item.value),
      onFocus: _onFocusItem.bind(null, index + 1)
    });
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: CL.FOOTER,
    style: S.FOOTER
  }, /*#__PURE__*/_react["default"].createElement("span", null, itemIndex, ":"), /*#__PURE__*/_react["default"].createElement("span", null, _total)));
};

var _default = SearchOptions;
exports["default"] = _default;
//# sourceMappingURL=SearchOptions.js.map