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

var _ModalPane = _interopRequireDefault(require("../zhn-moleculs/ModalPane"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _MenuPage = _interopRequireDefault(require("./MenuPage"));

var PERIOD_MS = 750;
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
    transition: "all " + PERIOD_MS + "ms ease-out"
  }
};

var _getTranslateX = function _getTranslateX(node) {
  var _prevStr = node.style.transform.substr(11).replace('px', '').replace(')', '');

  return parseInt(_prevStr, 10);
};

var ModalSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ModalSlider, _Component);

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
  function ModalSlider(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this.hPrevPage = function (pageNumber) {
      _this.setState(function (prevState) {
        prevState.pageCurrent = pageNumber - 1;
        _this._direction = -1;
        return prevState;
      });
    };

    _this._addPage = function (pages, id, title) {
      var _this$props = _this.props,
          model = _this$props.model,
          onClose = _this$props.onClose;
      pages.push(_react["default"].createElement(_MenuPage["default"], {
        key: id,
        style: _this._pageStyle,
        title: title,
        items: model[id],
        baseTitleCl: model.baseTitleCl,
        itemCl: model.itemCl,
        onPrevPage: _this.hPrevPage,
        onClose: onClose
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

        prevState.pageCurrent = pageNumber + 1; //prevState.direction = 1

        _this._direction = 1;
        return prevState;
      });
    };

    _this._crTransform = function () {
      var _WIDTH = _this._PAGE_WIDTH;
      var dX = '0';

      if (_this._direction !== 0 && _this._pagesNode) {
        var _prevInt = _getTranslateX(_this._pagesNode);

        dX = _this._direction === 1 ? _prevInt - _WIDTH : _prevInt + _WIDTH;
        _this._direction = 0;
      } else if (_this._direction === 0 && _this._pagesNode) {
        dX = _getTranslateX(_this._pagesNode);
      }

      return {
        transform: "translateX(" + dX + "px)"
      };
    };

    _this._refPages = function (n) {
      return _this._pagesNode = n;
    };

    _this._renderPages = function () {
      var _this$state = _this.state,
          pages = _this$state.pages,
          pageCurrent = _this$state.pageCurrent;
      return pages.map(function (Page, index) {
        return _react["default"].cloneElement(Page, {
          pageCurrent: pageCurrent,
          //pageNumber: index,
          pageNumber: index + 1
        });
      });
    };

    var INIT_ID = props.INIT_ID,
        pageWidth = props.pageWidth,
        maxPages = props.maxPages,
        _model = props.model,
        _onClose = props.onClose,
        _pW = _model.pageWidth || pageWidth,
        _maxP = _model.maxPages || maxPages,
        _pages = [];

    _this.hNextPage = (0, _throttleOnce["default"])(_this.hNextPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this.hPrevPage = (0, _throttleOnce["default"])(_this.hPrevPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this._PAGE_WIDTH = _pW;
    _this._pagesStyle = {
      width: _maxP * _pW + "px"
    };
    _this._pageStyle = {
      width: _pW + "px"
    };

    _pages.push(_react["default"].createElement(_MenuPage["default"], {
      key: INIT_ID,
      style: _this._pageStyle,
      items: _model[INIT_ID],
      baseTitleCl: _model.baseTitleCl,
      itemCl: _model.itemCl,
      onNextPage: _this.hNextPage,
      onClose: _onClose
    }));

    _this._direction = 0;
    _this.state = {
      pageCurrent: 1,
      pages: _pages
    };
    return _this;
  }

  var _proto = ModalSlider.prototype;

  _proto.render = function render() {
    var _pagesStyle = this._pagesStyle,
        _pageStyle = this._pageStyle,
        _this$props2 = this.props,
        isShow = _this$props2.isShow,
        className = _this$props2.className,
        rootStyle = _this$props2.rootStyle,
        style = _this$props2.style,
        onClose = _this$props2.onClose,
        _transform = this._crTransform(),
        _showHideStyle = (0, _extends2["default"])({}, style, {}, S.SHOW_HIDE, {}, _pageStyle),
        _divStyle = (0, _extends2["default"])({}, S.PAGES, {}, _pagesStyle, {}, _transform);

    return _react["default"].createElement(_ModalPane["default"], {
      isShow: isShow,
      style: rootStyle,
      onClose: onClose
    }, _react["default"].createElement(_ShowHide["default"], {
      className: className,
      style: _showHideStyle,
      isShow: isShow
    }, _react["default"].createElement("div", {
      ref: this._refPages,
      style: _divStyle
    }, this._renderPages())));
  };

  return ModalSlider;
}(_react.Component);

ModalSlider.defaultProps = {
  INIT_ID: 'p0',
  model: {
    pageWidth: 100,
    maxPages: 2,
    p0: []
  }
};
var _default = ModalSlider;
exports["default"] = _default;
//# sourceMappingURL=ModalSlider.js.map