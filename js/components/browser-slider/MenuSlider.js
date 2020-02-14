"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _throttleOnce = _interopRequireDefault(require("../../utils/throttleOnce"));

var _factoryClickItem = _interopRequireDefault(require("./factoryClickItem"));

var _loadItems = _interopRequireDefault(require("./loadItems"));

var _Frame = _interopRequireDefault(require("./Frame"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _ErrMsg = _interopRequireDefault(require("./ErrMsg"));

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
  var _prevStr = node.style.transform.substr(11).replace('px', '').replace(')', '');

  return parseInt(_prevStr, 10);
};

var MenuSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuSlider, _Component);

  function MenuSlider(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._loadItems = function () {
      var _this$props = _this.props,
          _this$props$dfProps = _this$props.dfProps,
          dfProps = _this$props$dfProps === void 0 ? {} : _this$props$dfProps,
          store = _this$props.store,
          lT = dfProps.lT,
          proxy = store.getProxy(lT);
      (0, _loadItems["default"])(dfProps.rootUrl, proxy).then(function (model) {
        if (Array.isArray(model)) {
          _this.setState({
            model: model,
            errMsg: undefined
          });
        }
      })["catch"](function (err) {
        _this.setState({
          errMsg: err.message
        });
      });
    };

    _this.hPrevPage = function (pageNumber) {
      _this.setState(function (prevState) {
        prevState.pageCurrent = pageNumber - 1;
        _this._direction = -1;
        return prevState;
      });
    };

    _this._addPage = function (pages, id, title) {
      var _this$props2 = _this.props,
          dfProps = _this$props2.dfProps,
          store = _this$props2.store;
      pages.push(_react["default"].createElement(_Frame["default"], {
        key: id,
        id: id,
        rootStyle: S.PAGE,
        store: store,
        title: title,
        dfProps: dfProps,
        onClickPrev: _this.hPrevPage,
        onClickNext: _this.hNextPage,
        loadItems: _loadItems["default"],
        fOnClickItem: _factoryClickItem["default"]
      }));
    };

    _this.hNextPage = function (id, title, pageNumber) {
      _this.setState(function (prevState) {
        var pages = prevState.pages,
            _max = pages.length - 1;

        if (_max + 1 > pageNumber) {
          if (pages[pageNumber] && pages[pageNumber].key !== id) {
            if (pageNumber > 0) {
              prevState.pages.splice(pageNumber);
            } else {
              prevState.pages = [];
            }

            _this._addPage(prevState.pages, id, title);
          }
        } else {
          _this._addPage(pages, id, title);
        }

        prevState.pageCurrent = pageNumber + 1;
        _this._direction = 1;
        return prevState;
      });
    };

    _this._refFirst = function (n) {
      return _this._firstNode = n;
    };

    _this._renderMenu = function () {
      var _this$state = _this.state,
          model = _this$state.model,
          errMsg = _this$state.errMsg,
          items = model.map(function (item, index) {
        var text = item.text,
            id = item.id,
            _ref = index === 0 ? _this._refFirst : void 0;

        return _react["default"].createElement(_MenuItem["default"], {
          ref: _ref,
          key: id,
          item: item,
          onClick: _this.hNextPage.bind(null, id, text, 0)
        });
      });
      return _react["default"].createElement("div", {
        style: S.PAGE
      }, items, _react["default"].createElement(_ErrMsg["default"], {
        errMsg: errMsg
      }));
    };

    _this._renderPages = function () {
      var _this$state2 = _this.state,
          pages = _this$state2.pages,
          pageCurrent = _this$state2.pageCurrent;
      return pages.map(function (page, index) {
        return _react["default"].cloneElement(page, {
          pageCurrent: pageCurrent,
          pageNumber: index + 1
        });
      });
    };

    _this._crTransform = function () {
      var dX = '0';

      if (_this._direction !== 0 && _this._menuNode) {
        var _prevInt = _getTranslateX(_this._menuNode);

        if (_this._direction === 1) {
          dX = _prevInt - 300;
        } else {
          dX = _prevInt + 300;
        }

        _this._direction = 0;
      } else if (_this._direction === 0 && _this._menuNode) {
        dX = _getTranslateX(_this._menuNode);
      }

      return {
        transform: "translateX(" + dX + "px)"
      };
    };

    _this._refMenu = function (n) {
      return _this._menuNode = n;
    };

    _this.focusFirst = function () {
      if (_this._firstNode) {
        _this._firstNode.focus();
      }
    };

    _this.hNextPage = (0, _throttleOnce["default"])(_this.hNextPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this.hPrevPage = (0, _throttleOnce["default"])(_this.hPrevPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this._direction = 0;
    _this.state = {
      model: [],
      pageCurrent: 0,
      pages: []
    };
    return _this;
  }

  var _proto = MenuSlider.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._loadItems();
  };

  _proto.render = function render() {
    var _transform = this._crTransform(),
        _pagesStyle = (0, _extends2["default"])({}, S.PAGES, {}, _transform);

    return _react["default"].createElement("div", {
      style: S.ROOT
    }, _react["default"].createElement("div", {
      ref: this._refMenu,
      style: _pagesStyle
    }, this._renderMenu(), this._renderPages()));
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var pageCurrent = this.state.pageCurrent;

    if (pageCurrent === 0) {
      setTimeout(this.focusFirst, 1000);
    }
  };

  return MenuSlider;
}(_react.Component);

var _default = MenuSlider;
exports["default"] = _default;
//# sourceMappingURL=MenuSlider.js.map