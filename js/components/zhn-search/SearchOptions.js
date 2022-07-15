"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _jsxRuntime = require("react/jsx-runtime");

const SEARCH = 'zhn-search',
      CL_ROOT = SEARCH + "__options",
      CL_OPTIONS = SEARCH + "__options__div",
      CL_ITEM = SEARCH + "__row",
      CL_FOOTER = SEARCH + "__footer",
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

const BoldSpan = _ref => {
  let {
    text = ''
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: S_BOLD,
    children: text
  });
};

const Delimeter = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  children: " - "
});

const Span = _ref2 => {
  let {
    text = ''
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    children: text
  });
};

const Item = _ref3 => {
  let {
    item,
    onClick,
    onFocus
  } = _ref3;
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

const _crItem = (item, index, _ref4) => {
  let {
    onClick,
    onFocus
  } = _ref4;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Item, {
    item: item,
    onClick: onClick.bind(null, item.value),
    onFocus: onFocus.bind(null, index + 1)
  }, item.value + index);
};

const SearchOptions = _ref5 => {
  let {
    isShow,
    options,
    onClickItem
  } = _ref5;

  const refRecentItem = (0, _uiApi.useRef)(),
        [itemIndex, setItemIndex] = (0, _uiApi.useState)(''),
        _onFocusItem = (index, event) => {
    refRecentItem.current = event.target;
    setItemIndex(index);
  };

  (0, _uiApi.useEffect)(() => {
    refRecentItem.current = null;
    setItemIndex('');
  }, [options]);
  (0, _uiApi.useEffect)(() => {
    if (isShow) {
      (0, _uiApi.focusRefElement)(refRecentItem);
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