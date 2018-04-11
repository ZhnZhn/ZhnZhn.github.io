'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _factoryClickItem = require('./factoryClickItem');

var _factoryClickItem2 = _interopRequireDefault(_factoryClickItem);

var _loadItems = require('./loadItems');

var _loadItems2 = _interopRequireDefault(_loadItems);

var _Frame = require('./Frame');

var _Frame2 = _interopRequireDefault(_Frame);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _ErrMsg = require('./ErrMsg');

var _ErrMsg2 = _interopRequireDefault(_ErrMsg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    width: '300px',
    overflow: 'hidden'
    //border: '1px solid green'
  },
  PAGES: {
    width: '1500px',
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    transition: 'all 750ms ease-out'
  },
  PAGE: {
    width: '300px'
    /*
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px',
    paddingBottom: '4px'
    */
  }
};

var _getTranslateX = function _getTranslateX(node) {
  var _prevStr = node.style.transform.substr(11).replace('px', '').replace(')', '');
  return parseInt(_prevStr, 10);
};

var MenuSlider = function (_Component) {
  (0, _inherits3.default)(MenuSlider, _Component);

  function MenuSlider(props) {
    (0, _classCallCheck3.default)(this, MenuSlider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuSlider.__proto__ || Object.getPrototypeOf(MenuSlider)).call(this));

    _this._loadItems = function () {
      var _this$props = _this.props,
          _this$props$dfProps = _this$props.dfProps,
          dfProps = _this$props$dfProps === undefined ? {} : _this$props$dfProps,
          store = _this$props.store,
          lT = dfProps.lT,
          proxy = store.getProxy(lT);

      (0, _loadItems2.default)(dfProps.rootUrl, proxy).then(function (model) {
        if (Array.isArray(model)) {
          _this.setState({ model: model, errMsg: undefined });
        }
      }).catch(function (err) {
        _this.setState({ errMsg: err.message });
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

      pages.push(_react2.default.createElement(_Frame2.default, {
        key: id,
        id: id,
        rootStyle: S.PAGE,
        store: store,
        title: title,
        dfProps: dfProps,
        onClickPrev: _this.hPrevPage,
        onClickNext: _this.hNextPage,
        loadItems: _loadItems2.default,
        fOnClickItem: _factoryClickItem2.default
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

        return _react2.default.createElement(_MenuItem2.default, {
          ref: _ref,
          key: id,
          item: item,
          onClick: _this.hNextPage.bind(null, id, text, 0)
        });
      });


      return _react2.default.createElement(
        'div',
        { style: S.PAGE },
        items,
        _react2.default.createElement(_ErrMsg2.default, { errMsg: errMsg })
      );
    };

    _this._renderPages = function () {
      var _this$state2 = _this.state,
          pages = _this$state2.pages,
          pageCurrent = _this$state2.pageCurrent;

      return pages.map(function (page, index) {
        return _react2.default.cloneElement(page, {
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

      return { transform: 'translateX(' + dX + 'px)' };
    };

    _this._refMenu = function (n) {
      return _this._menuNode = n;
    };

    _this.focusFirst = function () {
      if (_this._firstNode) {
        _this._firstNode.focus();
      }
    };

    _this._direction = 0;
    _this.state = {
      model: [],
      pageCurrent: 0,
      pages: []
    };
    return _this;
  }

  (0, _createClass3.default)(MenuSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadItems();
    }
  }, {
    key: 'render',
    value: function render() {
      var _transform = this._crTransform(),
          _pagesStyle = (0, _extends3.default)({}, S.PAGES, _transform);

      return _react2.default.createElement(
        'div',
        { style: S.ROOT },
        _react2.default.createElement(
          'div',
          {
            ref: this._refMenu,
            style: _pagesStyle
          },
          this._renderMenu(),
          this._renderPages()
        )
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var pageCurrent = this.state.pageCurrent;

      if (pageCurrent === 0) {
        setTimeout(this.focusFirst, 1000);
      }
    }
  }]);
  return MenuSlider;
}(_react.Component);

exports.default = MenuSlider;
//# sourceMappingURL=MenuSlider.js.map