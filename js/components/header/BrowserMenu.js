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

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalPane = require('../zhn-moleculs/ModalPane');

var _ModalPane2 = _interopRequireDefault(_ModalPane);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _MenuPage = require('./MenuPage');

var _MenuPage2 = _interopRequireDefault(_MenuPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ROW: 'row__pane-topic',

  ITEM_DF: 'row__pane-topic item__quandl',
  //ITEM_WATCH: 'row__pane-topic item__watch',
  ITEM_ABOUT: 'row__pane-topic item__about',

  TITLE: 'row__pane-topic'
};

var S = {
  SHOW_HIDE: {
    padding: '0px',
    width: '235px',

    overflow: 'hidden'
  },

  PAGES: {
    width: '470px',
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    transition: 'all 750ms ease-out'
  },

  PAGE: {
    width: '235px'
  }
};

var _getTranslateX = function _getTranslateX(node) {
  var _prevStr = node.style.transform.substr(11).replace('px', '').replace(')', '');
  return parseInt(_prevStr, 10);
};

var BrowserMenu = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(BrowserMenu, _Component);

  function BrowserMenu(props) {
    (0, _classCallCheck3.default)(this, BrowserMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BrowserMenu.__proto__ || Object.getPrototypeOf(BrowserMenu)).call(this));

    _initialiseProps.call(_this);

    var model = props.model,
        onClickDynamic = props.onClickDynamic,
        onClickQuandl = props.onClickQuandl,
        onClickAbout = props.onClickAbout,
        pages = [];

    pages.push(_react2.default.createElement(
      _MenuPage2.default,
      {
        key: 'page_0',
        style: S.PAGE,
        CL: CL,
        model: model.page_0,
        onClickDynamic: onClickDynamic,
        onClickQuandl: onClickQuandl,
        onClickNext: _this.hNextPage
      },
      _react2.default.createElement(
        'div',
        {
          className: CL.ITEM_ABOUT,
          onClick: onClickAbout
        },
        'About'
      )
    ));
    _this._direction = 0;

    _this.state = {
      pageCurrent: 1,
      pages: pages
    };
    return _this;
  }

  (0, _createClass3.default)(BrowserMenu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          className = _props.className,
          onClose = _props.onClose,
          _transform = this._crTransform(),
          _pagesStyle = (0, _extends3.default)({}, S.PAGES, _transform);

      return _react2.default.createElement(
        _ModalPane2.default,
        {
          isShow: isShow,
          onClose: onClose
        },
        _react2.default.createElement(
          _ShowHide2.default,
          {
            className: className,
            style: S.SHOW_HIDE,
            isShow: isShow
          },
          _react2.default.createElement(
            'div',
            {
              ref: this._refPages,
              style: _pagesStyle
            },
            this._renderPages()
          )
        )
      );
    }
  }]);
  return BrowserMenu;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.hPrevPage = function (pageNumber) {
    _this2.setState(function (prevState) {
      prevState.pageCurrent = pageNumber - 1;
      _this2._direction = -1;
      return prevState;
    });
  };

  this._addPage = function (pages, id, title) {
    var _props2 = _this2.props,
        model = _props2.model,
        onClickDynamic = _props2.onClickDynamic,
        onClickQuandl = _props2.onClickQuandl;
    //, { pageCurrent } = this.state;

    pages.push(_react2.default.createElement(_MenuPage2.default, {
      key: id,
      style: S.PAGE,
      CL: CL,
      title: title,
      model: model[id],
      onClickDynamic: onClickDynamic,
      onClickQuandl: onClickQuandl,
      onClickPrev: _this2.hPrevPage
      //onClickPrev={this.hPrevPage.bind(null, pageCurrent)}
    }));
  };

  this.hNextPage = function (id, title, pageNumber) {
    _this2.setState(function (prevState) {
      var pages = prevState.pages,
          _max = pages.length - 1;


      if (_max + 1 > pageNumber) {
        if (pages[pageNumber] && pages[pageNumber].key !== id) {
          if (pageNumber > 0) {
            prevState.pages.splice(pageNumber);
          } else {
            prevState.pages = [];
          }
          _this2._addPage(prevState.pages, id, title);
        }
      } else {
        _this2._addPage(pages, id, title);
      }

      prevState.pageCurrent = pageNumber + 1;
      //prevState.direction = 1
      _this2._direction = 1;
      return prevState;
    });
  };

  this._crTransform = function () {
    var dX = '0';
    if (_this2._direction !== 0 && _this2._pagesNode) {
      var _prevInt = _getTranslateX(_this2._pagesNode);
      if (_this2._direction === 1) {
        dX = _prevInt - 235;
      } else {
        dX = _prevInt + 235;
      }
      _this2._direction = 0;
    } else if (_this2._direction === 0 && _this2._pagesNode) {
      dX = _getTranslateX(_this2._pagesNode);
    }

    return { transform: 'translateX(' + dX + 'px)' };
  };

  this._refPages = function (n) {
    return _this2._pagesNode = n;
  };

  this._renderPages = function () {
    var _state = _this2.state,
        pages = _state.pages,
        pageCurrent = _state.pageCurrent;

    return pages.map(function (Page, index) {
      return _react2.default.cloneElement(Page, {
        pageCurrent: pageCurrent,
        //pageNumber: index,
        pageNumber: index + 1
      });
    });
  };
}, _temp);
exports.default = BrowserMenu;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\BrowserMenu.js.map