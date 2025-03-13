"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useThrottleCallback = _interopRequireDefault(require("../hooks/useThrottleCallback"));
var _factoryClickItem = _interopRequireDefault(require("./factoryClickItem"));
var _loadItems = _interopRequireDefault(require("./loadItems"));
var _PageList = _interopRequireDefault(require("./PageList"));
var _jsxRuntime = require("react/jsx-runtime");
const PAGE_WIDTH = 300;
const S_ROOT = {
    width: PAGE_WIDTH,
    overflow: 'hidden'
  },
  S_PAGES = {
    width: 5 * PAGE_WIDTH,
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    transition: 'all .3s ease-out'
  },
  S_PAGE = {
    width: PAGE_WIDTH
  };
const MenuSlider = _ref => {
  let {
    dfProps,
    getProxy
  } = _ref;
  const [{
      pageCurrent,
      pages
    }, setState] = (0, _uiApi.useState)({
      pageCurrent: 0,
      pages: [{
        id: "",
        title: "Menu"
      }]
    }),
    _hPrevPage = (0, _useThrottleCallback.default)(pageNumber => {
      setState(prevState => {
        const {
          pageCurrent
        } = prevState;
        return pageCurrent === 0 || pageCurrent !== pageNumber ? prevState : {
          ...prevState,
          pageCurrent: pageNumber - 1
        };
      });
    }),
    _hNextPage = (0, _useThrottleCallback.default)((id, title, pageNumber) => {
      setState(prevState => {
        const {
          pageCurrent,
          pages
        } = prevState;
        if (pageNumber !== pageCurrent) {
          return prevState;
        }
        const _nextPageNumber = pageNumber + 1,
          {
            id: _id
          } = pages[_nextPageNumber] || {};
        if (id && _id !== id) {
          pages.splice(_nextPageNumber);
          pages.push({
            id,
            title
          });
        }
        return {
          pages,
          pageCurrent: pageNumber + 1
        };
      });
    }, [_hPrevPage]),
    _pagesStyle = {
      ...S_PAGES,
      ...(0, _styleFn.crSliderTransformStyle)(PAGE_WIDTH, pageCurrent + 1)
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_ROOT,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _pagesStyle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageList.default, {
        pages: pages,
        pageCurrent: pageCurrent,
        style: S_PAGE,
        dfProps: dfProps,
        onClickPrev: _hPrevPage,
        onClickNext: _hNextPage,
        loadItems: _loadItems.default,
        fOnClickItem: _factoryClickItem.default,
        getProxy: getProxy
      })
    })
  });
};
var _default = exports.default = MenuSlider;
//# sourceMappingURL=MenuSlider.js.map