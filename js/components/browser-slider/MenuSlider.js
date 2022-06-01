"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _throttleOnce = _interopRequireDefault(require("../../utils/throttleOnce"));

var _factoryClickItem = _interopRequireDefault(require("./factoryClickItem"));

var _loadItems = _interopRequireDefault(require("./loadItems"));

var _Frame = _interopRequireDefault(require("./Frame"));

var _PageList = _interopRequireDefault(require("./PageList"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROOT = {
  width: 300,
  overflow: 'hidden'
},
      S_PAGES = {
  width: 1500,
  overflowX: 'hidden',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'flex-start',
  transition: 'all 750ms ease-out'
},
      S_PAGE = {
  width: 300
};

const _getRefValue = ref => ref.current;

const _setRefValue = (ref, value) => ref.current = value;

const _getTranslateX = node => {
  const _prevStr = node.style.transform.substring(11).replace('px', '').replace(')', '');

  return parseInt(_prevStr, 10);
};

const _crPagesStyle = (refMenu, refDirection) => {
  let dX = '0';

  const _menuNode = _getRefValue(refMenu),
        _direction = _getRefValue(refDirection);

  if (_direction !== 0 && _menuNode) {
    const _prevInt = _getTranslateX(_menuNode);

    dX = _direction === 1 ? _prevInt - 300 : _prevInt + 300;

    _setRefValue(refDirection, 0);
  } else if (_direction === 0 && _menuNode) {
    dX = _getTranslateX(_menuNode);
  }

  return { ...S_PAGES,
    transform: "translateX(" + dX + "px)"
  };
};

const MenuSlider = _ref => {
  let {
    dfProps,
    store
  } = _ref;

  const _refMenu = (0, _react.useRef)(),
        _refDirection = (0, _react.useRef)(0),
        [state, setState] = (0, _react.useState)({
    pageCurrent: 0,
    pages: []
  }),
        {
    pageCurrent,
    pages
  } = state
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
    const _addPageTo = (pages, id, title) => {
      pages.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Frame.default, {
        id: id,
        style: S_PAGE,
        store: store,
        title: title,
        dfProps: dfProps,
        onClickPrev: _hPrevPage,
        onClickNext: _hNextPage,
        loadItems: _loadItems.default,
        fOnClickItem: _factoryClickItem.default
      }, id));
    };

    setState(prevState => {
      let {
        pageCurrent,
        pages
      } = prevState;

      if (pageNumber !== pageCurrent) {
        return prevState;
      }

      if (pageNumber < pages.length) {
        const _page = pages[pageNumber];

        if (_page && _page.key !== id) {
          if (pageNumber > 0) {
            pages.splice(pageNumber);
          } else {
            pages = [];
          }

          _addPageTo(pages, id, title);
        }
      } else {
        _addPageTo(pages, id, title);
      }

      _setRefValue(_refDirection, 1);

      return {
        pages,
        pageCurrent: pageNumber + 1
      };
    });
  }), [_hPrevPage, dfProps, store])
  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _pagesStyle = _crPagesStyle(_refMenu, _refDirection);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_ROOT,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: _refMenu,
      style: _pagesStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Frame.default, {
        style: S_PAGE,
        title: "Main Menu",
        store: store,
        dfProps: dfProps,
        pageCurrent: pageCurrent,
        pageNumber: 0,
        onClickNext: _hNextPage,
        loadItems: _loadItems.default,
        fOnClickItem: _factoryClickItem.default
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageList.default, {
        pages: pages,
        pageCurrent: pageCurrent
      })]
    })
  });
};

var _default = MenuSlider;
exports.default = _default;
//# sourceMappingURL=MenuSlider.js.map