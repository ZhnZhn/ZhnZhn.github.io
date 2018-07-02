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

var _throttleOnce = require('../../utils/throttleOnce');

var _throttleOnce2 = _interopRequireDefault(_throttleOnce);

var _ModalPane = require('../zhn-moleculs/ModalPane');

var _ModalPane2 = _interopRequireDefault(_ModalPane);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _MenuPage = require('./MenuPage');

var _MenuPage2 = _interopRequireDefault(_MenuPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PERIOD_MS = 750;
//const THROTTLE_MS = 800;
var S = {
  SHOW_HIDE: {
    position: 'absolute',
    overflow: 'hidden'
  },
  PAGES: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    transition: 'all ' + PERIOD_MS + 'ms ease-out'
  }
};

var _getTranslateX = function _getTranslateX(node) {
  var _prevStr = node.style.transform.substr(11).replace('px', '').replace(')', '');
  return parseInt(_prevStr, 10);
};

var ModalSlider = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ModalSlider, _Component);

  function ModalSlider(props) {
    (0, _classCallCheck3.default)(this, ModalSlider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModalSlider.__proto__ || Object.getPrototypeOf(ModalSlider)).call(this));

    _initialiseProps.call(_this);

    var INIT_ID = props.INIT_ID,
        pageWidth = props.pageWidth,
        maxPages = props.maxPages,
        model = props.model,
        onClose = props.onClose,
        _pW = model.pageWidth || pageWidth,
        _maxP = model.maxPages || maxPages,
        pages = [];

    _this.hNextPage = (0, _throttleOnce2.default)(_this.hNextPage.bind(_this));
    _this.hPrevPage = (0, _throttleOnce2.default)(_this.hPrevPage.bind(_this));

    _this._PAGE_WIDTH = _pW;
    _this._pagesStyle = {
      width: _maxP * _pW + 'px'
    };
    _this._pageStyle = {
      width: _pW + 'px'
    };

    pages.push(_react2.default.createElement(_MenuPage2.default, {
      key: INIT_ID,
      style: _this._pageStyle,
      items: model[INIT_ID],
      baseTitleCl: model.baseTitleCl,
      onNextPage: _this.hNextPage,
      onClose: onClose
    }));

    _this._direction = 0;

    _this.state = {
      pageCurrent: 1,
      pages: pages
    };
    return _this;
  }
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
      pageWidth: PropTypes.number,
    maxPages: PropTypes.number,
    model: PropTypes.object,
      onClose: PropTypes.func
  }
  */

  (0, _createClass3.default)(ModalSlider, [{
    key: 'render',
    value: function render() {
      var _pagesStyle = this._pagesStyle,
          _pageStyle = this._pageStyle,
          _props = this.props,
          isShow = _props.isShow,
          className = _props.className,
          rootStyle = _props.rootStyle,
          style = _props.style,
          onClose = _props.onClose,
          _transform = this._crTransform(),
          _showHideStyle = (0, _extends3.default)({}, style, S.SHOW_HIDE, _pageStyle),
          _divStyle = (0, _extends3.default)({}, S.PAGES, _pagesStyle, _transform);

      return _react2.default.createElement(
        _ModalPane2.default,
        {
          isShow: isShow,
          style: rootStyle,
          onClose: onClose
        },
        _react2.default.createElement(
          _ShowHide2.default,
          {
            className: className,
            style: _showHideStyle,
            isShow: isShow
          },
          _react2.default.createElement(
            'div',
            {
              ref: this._refPages,
              style: _divStyle
            },
            this._renderPages()
          )
        )
      );
    }
  }]);
  return ModalSlider;
}(_react.Component), _class.defaultProps = {
  INIT_ID: 'p0',
  model: {
    pageWidth: 100,
    maxPages: 2,
    p0: []
  }
}, _initialiseProps = function _initialiseProps() {
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
        onClose = _props2.onClose;

    pages.push(_react2.default.createElement(_MenuPage2.default, {
      key: id,
      style: _this2._pageStyle,
      title: title,
      items: model[id],
      baseTitleCl: model.baseTitleCl,
      onPrevPage: _this2.hPrevPage,
      onClose: onClose
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
    var _WIDTH = _this2._PAGE_WIDTH;
    var dX = '0';
    if (_this2._direction !== 0 && _this2._pagesNode) {
      var _prevInt = _getTranslateX(_this2._pagesNode);
      dX = _this2._direction === 1 ? _prevInt - _WIDTH : _prevInt + _WIDTH;
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
exports.default = ModalSlider;
//# sourceMappingURL=ModalSlider.js.map