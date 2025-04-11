"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _tabPaneFn = require("./tabPaneFn");
var _jsxRuntime = require("react/jsx-runtime");
const S_TABS = {
    margin: '5px 5px 10px 24px'
  },
  S_COMPONENTS = {
    width: "100%",
    height: "100%"
  },
  S_COMPONENTS_BLOCK = {
    ..._styleFn.S_BLOCK,
    ...S_COMPONENTS
  };
const _crNextId = (id, childrenLength) => id === -1 ? childrenLength - 1 : id === childrenLength ? 0 : id;
const TabPane = _ref => {
  let {
    ariaLabel,
    id,
    isShow,
    width,
    height,
    children,
    ...restTapPanelProps
  } = _ref;
  const [selectedTabIndex, setSelectedTabIndex] = (0, _uiApi.useState)(0),
    _isSelectedTabIndex = index => index === selectedTabIndex,
    _hKeyDown = (index, evt) => {
      const _focusTabByIndex = tabIndex => {
          const _nextIndex = _crNextId(tabIndex, children.length);
          (0, _uiApi.focusElementById)((0, _tabPaneFn.crTabId)(id, _nextIndex));
          setSelectedTabIndex(_nextIndex);
        },
        {
          keyCode
        } = evt,
        _increaseIndexBy = keyCode === 39 ? 1 : keyCode === 37 ? -1 : 0;
      if (_increaseIndexBy) {
        (0, _uiApi.stopDefaultFor)(evt);
        _focusTabByIndex(index + _increaseIndexBy);
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      width,
      height
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      role: "tablist",
      "aria-label": ariaLabel,
      "aria-orientation": "horizontal",
      style: S_TABS,
      children: (0, _uiApi.safeMap)(children, (TabElement, index) => {
        const isSelected = _isSelectedTabIndex(index);
        return (0, _uiApi.cloneUiElement)(TabElement, {
          isSelected,
          tabId: (0, _tabPaneFn.crTabId)(id, index),
          tabPanelId: (0, _tabPaneFn.crTabPanelId)(id, index),
          className: (0, _tabPaneFn.crTabCn)(isSelected),
          onClick: () => setSelectedTabIndex(index),
          onKeyDown: evt => _hKeyDown(index, evt)
        }, index);
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_COMPONENTS,
      children: (0, _uiApi.safeMap)(children, (tab, index) => {
        const _isSelected = _isSelectedTabIndex(index);
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: _isSelected ? S_COMPONENTS_BLOCK : _styleFn.S_NONE,
          role: "tabpanel",
          id: (0, _tabPaneFn.crTabPanelId)(id, index),
          "aria-labelledby": (0, _tabPaneFn.crTabId)(id, index),
          children: (0, _uiApi.cloneUiElement)(tab.props.children, {
            isVisible: (0, _isTypeFn.isBool)(isShow) ? isShow && _isSelected : _isSelected,
            ...restTapPanelProps
          })
        }, index);
      })
    })]
  });
};
var _default = exports.default = TabPane;
//# sourceMappingURL=TabPane.js.map