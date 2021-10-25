"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_ROOT = 'zhn-search__options',
      CL_OPTIONS = 'zhn-search__options__div',
      CL_ITEM = 'zhn-search__row',
      CL_FOOTER = 'zhn-search__footer',
      S_OPTIONS = {
  width: 250
},
      S_BOLD = {
  fontWeight: 'bold'
},
      S_FOOTER = {
  color: 'black',
  width: 250,
  height: 32,
  padding: '4px 0 4px 10px',
  fontWeight: 'bold'
};

const BoldSpan = ({
  text = ''
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  style: S_BOLD,
  children: text
});

const Delimeter = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  children: " - "
});

const Span = ({
  text = ''
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  children: text
});

const Item = ({
  item,
  onClick,
  onFocus
}) => {
  const {
    value,
    name,
    type,
    region,
    currency
  } = item;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    className: CL_ITEM,
    onClick: onClick,
    onFocus: onFocus,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BoldSpan, {
      text: value
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Delimeter, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(Span, {
      text: name
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Delimeter, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(BoldSpan, {
      text: type
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Delimeter, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(Span, {
      text: region
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Delimeter, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(BoldSpan, {
      text: currency
    })]
  });
};

const _crItem = (item, index, {
  onClick,
  onFocus
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(Item, {
  item: item,
  onClick: onClick.bind(null, item.value),
  onFocus: onFocus.bind(null, index + 1)
}, item.value + index);

const SearchOptions = ({
  isShow,
  options,
  onClickItem
}) => {
  const refRecentItem = (0, _react.useRef)(),
        [itemIndex, setItemIndex] = (0, _react.useState)(''),
        _onFocusItem = (index, event) => {
    refRecentItem.current = event.target;
    setItemIndex(index);
  };

  (0, _react.useEffect)(() => {
    refRecentItem.current = null;
    setItemIndex('');
  }, [options]);
  (0, _react.useEffect)(() => {
    if (isShow && refRecentItem.current) {
      refRecentItem.current.focus();
    }
  }, [isShow]);

  const _total = options.length || '';

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ShowHide.default, {
    isShow: isShow,
    className: CL_ROOT,
    style: S_OPTIONS,
    withoutAnimation: true,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: CL_OPTIONS,
      style: S_OPTIONS,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
        items: options,
        crItem: _crItem,
        onClick: onClickItem,
        onFocus: _onFocusItem
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_FOOTER,
      style: S_FOOTER,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        children: [itemIndex, ":"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: _total
      })]
    })]
  });
};

var _default = SearchOptions;
exports.default = _default;
//# sourceMappingURL=SearchOptions.js.map