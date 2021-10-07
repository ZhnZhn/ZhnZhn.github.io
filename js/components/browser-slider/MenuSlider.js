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

const _getTranslateX = node => {
  const _prevStr = node.style.transform.substring(11).replace('px', '').replace(')', '');

  return parseInt(_prevStr, 10);
};

class MenuSlider extends _react.Component {
  constructor(props) {
    super(props);

    this.hPrevPage = pageNumber => {
      this.setState(({
        pageCurrent
      }) => {
        if (pageCurrent === 0 || pageCurrent !== pageNumber) {
          return null;
        }

        this._direction = -1;
        return {
          pageCurrent: pageNumber - 1
        };
      });
    };

    this._addPage = (pages, id, title) => {
      const {
        dfProps,
        store
      } = this.props;
      pages.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Frame.default, {
        id: id,
        style: S_PAGE,
        store: store,
        title: title,
        dfProps: dfProps,
        onClickPrev: this.hPrevPage,
        onClickNext: this.hNextPage,
        loadItems: _loadItems.default,
        fOnClickItem: _factoryClickItem.default
      }, id));
    };

    this.hNextPage = (id, title, pageNumber) => {
      this.setState(({
        pageCurrent,
        pages
      }) => {
        if (pageNumber !== pageCurrent) {
          return null;
        }

        if (pageNumber < pages.length) {
          if (pages[pageNumber] && pages[pageNumber].key !== id) {
            if (pageNumber > 0) {
              pages.splice(pageNumber);
            } else {
              pages = [];
            }

            this._addPage(pages, id, title);
          }
        } else {
          this._addPage(pages, id, title);
        }

        this._direction = 1;
        return {
          pages,
          pageCurrent: pageNumber + 1
        };
      });
    };

    this._crTransform = () => {
      let dX = '0';
      const _menuNode = this._refMenu.current;

      if (this._direction !== 0 && _menuNode) {
        const _prevInt = _getTranslateX(_menuNode);

        dX = this._direction === 1 ? _prevInt - 300 : _prevInt + 300;
        this._direction = 0;
      } else if (this._direction === 0 && _menuNode) {
        dX = _getTranslateX(_menuNode);
      }

      return {
        transform: "translateX(" + dX + "px)"
      };
    };

    this.hNextPage = (0, _throttleOnce.default)(this.hNextPage.bind(this));
    this.hPrevPage = (0, _throttleOnce.default)(this.hPrevPage.bind(this));
    this._refMenu = /*#__PURE__*/(0, _react.createRef)();
    this._direction = 0;

    this._fOnClickItem = ({
      id,
      text
    }) => this.hNextPage.bind(null, id, text, 0);

    this.state = {
      pageCurrent: 0,
      pages: []
    };
  }

  render() {
    const {
      dfProps,
      store
    } = this.props,
          {
      pages,
      pageCurrent
    } = this.state,
          _transform = this._crTransform(),
          _pagesStyle = { ...S_PAGES,
      ..._transform
    };

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_ROOT,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ref: this._refMenu,
        style: _pagesStyle,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Frame.default, {
          style: S_PAGE,
          title: "Main Menu",
          store: store,
          dfProps: dfProps,
          pageCurrent: pageCurrent,
          pageNumber: 0,
          onClickNext: this.hNextPage,
          loadItems: _loadItems.default,
          fOnClickItem: _factoryClickItem.default
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageList.default, {
          pages: pages,
          pageCurrent: pageCurrent
        })]
      })
    });
  }

}

var _default = MenuSlider;
exports.default = _default;
//# sourceMappingURL=MenuSlider.js.map