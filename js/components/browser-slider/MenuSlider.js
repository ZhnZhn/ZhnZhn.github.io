"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _throttleOnce = _interopRequireDefault(require("../../utils/throttleOnce"));

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
  transition: 'all 750ms ease-out'
},
      S_PAGE = {
  width: PAGE_WIDTH
};

const _getRefValue = ref => ref.current;

const _setRefValue = (ref, value) => ref.current = value;

const _getTranslateX = node => {
  const _prevStr = node.style.transform.substring(11).replace('px', '').replace(')', '');

  return parseInt(_prevStr, 10);
};

const _crPagesStyle = (refMenu, refDirection) => {
  const _menuNode = _getRefValue(refMenu),
        _direction = _getRefValue(refDirection),
        dX = _direction !== 0 && _menuNode ? (_setRefValue(refDirection, 0), _getTranslateX(_menuNode) - 1 * _direction * PAGE_WIDTH) : _direction === 0 && _menuNode ? _getTranslateX(_menuNode) : 0;

  return { ...S_PAGES,
    transform: "translateX(" + dX + "px)"
  };
};

const INITIAL_STATE = {
  pageCurrent: 0,
  pages: [{
    id: "",
    title: "Menu"
  }]
};

const MenuSlider = _ref => {
  let {
    dfProps,
    store
  } = _ref;

  const _refMenu = (0, _react.useRef)(),
        _refDirection = (0, _react.useRef)(0),
        [{
    pageCurrent,
    pages
  }, setState] = (0, _react.useState)(INITIAL_STATE)
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hPrevPage = (0, _react.useCallback)((0, _throttleOnce.default)(pageNumber => {
    setState(prevState => {
      const {
        pageCurrent
      } = prevState;
      return pageCurrent === 0 || pageCurrent !== pageNumber ? prevState : _setRefValue(_refDirection, -1), { ...prevState,
        pageCurrent: pageNumber - 1
      };
    });
  }), []),
        _hNextPage = (0, _react.useCallback)((0, _throttleOnce.default)((id, title, pageNumber) => {
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

      _setRefValue(_refDirection, 1);

      return {
        pages,
        pageCurrent: pageNumber + 1
      };
    });
  }), [_hPrevPage])
  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _pagesStyle = _crPagesStyle(_refMenu, _refDirection);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_ROOT,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: _refMenu,
      style: _pagesStyle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageList.default, {
        pages: pages,
        pageCurrent: pageCurrent,
        style: S_PAGE,
        store: store,
        dfProps: dfProps,
        onClickPrev: _hPrevPage,
        onClickNext: _hNextPage,
        loadItems: _loadItems.default,
        fOnClickItem: _factoryClickItem.default
      })
    })
  });
};

var _default = MenuSlider;
exports.default = _default;
//# sourceMappingURL=MenuSlider.js.map