"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _throttleOnce = _interopRequireDefault(require("../../utils/throttleOnce"));

var _factoryClickItem = _interopRequireDefault(require("./factoryClickItem"));

var _loadItems = _interopRequireDefault(require("./loadItems"));

var _Frame = _interopRequireDefault(require("./Frame"));

var _PageList = _interopRequireDefault(require("./PageList"));

var S = {
  ROOT: {
    width: 300,
    overflow: 'hidden'
  },
  PAGES: {
    width: 1500,
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    transition: 'all 750ms ease-out'
  },
  PAGE: {
    width: 300
  }
};

var _getTranslateX = function _getTranslateX(node) {
  var _prevStr = node.style.transform.substring(11).replace('px', '').replace(')', '');

  return parseInt(_prevStr, 10);
};

var MenuSlider = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(MenuSlider, _Component);

  function MenuSlider(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.hPrevPage = function (pageNumber) {
      _this.setState(function (_ref) {
        var pageCurrent = _ref.pageCurrent;

        if (pageCurrent === 0 || pageCurrent !== pageNumber) {
          return null;
        }

        _this._direction = -1;
        return {
          pageCurrent: pageNumber - 1
        };
      });
    };

    _this._addPage = function (pages, id, title) {
      var _this$props = _this.props,
          dfProps = _this$props.dfProps,
          store = _this$props.store;
      pages.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Frame["default"], {
        id: id,
        style: S.PAGE,
        store: store,
        title: title,
        dfProps: dfProps,
        onClickPrev: _this.hPrevPage,
        onClickNext: _this.hNextPage,
        loadItems: _loadItems["default"],
        fOnClickItem: _factoryClickItem["default"]
      }, id));
    };

    _this.hNextPage = function (id, title, pageNumber) {
      _this.setState(function (_ref2) {
        var pageCurrent = _ref2.pageCurrent,
            pages = _ref2.pages;

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

            _this._addPage(pages, id, title);
          }
        } else {
          _this._addPage(pages, id, title);
        }

        _this._direction = 1;
        return {
          pages: pages,
          pageCurrent: pageNumber + 1
        };
      });
    };

    _this._crTransform = function () {
      var dX = '0';
      var _menuNode = _this._refMenu.current;

      if (_this._direction !== 0 && _menuNode) {
        var _prevInt = _getTranslateX(_menuNode);

        dX = _this._direction === 1 ? _prevInt - 300 : _prevInt + 300;
        _this._direction = 0;
      } else if (_this._direction === 0 && _menuNode) {
        dX = _getTranslateX(_menuNode);
      }

      return {
        transform: "translateX(" + dX + "px)"
      };
    };

    _this.hNextPage = (0, _throttleOnce["default"])(_this.hNextPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this.hPrevPage = (0, _throttleOnce["default"])(_this.hPrevPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this._refMenu = /*#__PURE__*/(0, _react.createRef)();
    _this._direction = 0;

    _this._fOnClickItem = function (_ref3) {
      var id = _ref3.id,
          text = _ref3.text;
      return _this.hNextPage.bind(null, id, text, 0);
    };

    _this.state = {
      pageCurrent: 0,
      pages: []
    };
    return _this;
  }

  var _proto = MenuSlider.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        dfProps = _this$props2.dfProps,
        store = _this$props2.store,
        _this$state = this.state,
        pages = _this$state.pages,
        pageCurrent = _this$state.pageCurrent,
        _transform = this._crTransform(),
        _pagesStyle = (0, _extends2["default"])({}, S.PAGES, _transform);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S.ROOT,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ref: this._refMenu,
        style: _pagesStyle,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Frame["default"], {
          style: S.PAGE,
          title: "Main Menu",
          store: store,
          dfProps: dfProps,
          pageCurrent: pageCurrent,
          pageNumber: 0,
          onClickNext: this.hNextPage,
          loadItems: _loadItems["default"],
          fOnClickItem: _factoryClickItem["default"]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageList["default"], {
          pages: pages,
          pageCurrent: pageCurrent
        })]
      })
    });
  };

  return MenuSlider;
}(_react.Component);

var _default = MenuSlider;
exports["default"] = _default;
//# sourceMappingURL=MenuSlider.js.map