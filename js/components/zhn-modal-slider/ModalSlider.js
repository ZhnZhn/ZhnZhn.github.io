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
    transition: 'all 750ms ease-out'
  }
};

var _crInitialState = function _crInitialState(model, INIT_ID) {
  return {
    pageCurrent: 1,
    pages: [/*#__PURE__*/_react["default"].createElement(_MenuPage["default"], {
      key: INIT_ID,
      items: model[INIT_ID],
      titleCl: model.titleCl,
      itemCl: model.itemCl
    })],
    model: model
  };
};

var ModalSlider = /*#__PURE__*/function (_Component) {
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

    _this = _Component.call(this, props) || this;

    _this.hPrevPage = function (pageNumber) {
      _this.setState(function (prevState) {
        prevState.pageCurrent = pageNumber - 1;
        return prevState;
      });
    };

    _this._addPage = function (pages, id, title) {
      var model = _this.props.model;
      pages.push( /*#__PURE__*/_react["default"].createElement(_MenuPage["default"], {
        key: id,
        title: title,
        items: model[id],
        titleCl: model.titleCl,
        itemCl: model.itemCl
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
        return prevState;
      });
    };

    _this._crTransform = function () {
      var pageCurrent = _this.state.pageCurrent,
          _dX = -1 * _this._PAGE_WIDTH * (pageCurrent - 1) + 0;

      return {
        transform: "translateX(" + _dX + "px)"
      };
    };

    _this._refPages = function (n) {
      return _this._pagesNode = n;
    };

    _this._renderPages = function () {
      var onClose = _this.props.onClose,
          _this$state = _this.state,
          pages = _this$state.pages,
          pageCurrent = _this$state.pageCurrent;
      return pages.map(function (Page, index) {
        return /*#__PURE__*/_react["default"].cloneElement(Page, {
          pageCurrent: pageCurrent,
          style: _this._pageStyle,
          pageNumber: index + 1,
          onNextPage: index === 0 ? _this.hNextPage : void 0,
          onPrevPage: index !== 0 ? _this.hPrevPage : void 0,
          onClose: onClose
        });
      });
    };

    var INIT_ID = props.INIT_ID,
        pageWidth = props.pageWidth,
        maxPages = props.maxPages,
        _model = props.model,
        _pW = _model.pageWidth || pageWidth,
        _maxP = _model.maxPages || maxPages;

    _this._PAGE_WIDTH = _pW;
    _this._pagesStyle = {
      width: _maxP * _pW + "px"
    };
    _this._pageStyle = {
      width: _pW + "px"
    };
    _this.hNextPage = (0, _throttleOnce["default"])(_this.hNextPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this.hPrevPage = (0, _throttleOnce["default"])(_this.hPrevPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this.state = _crInitialState(_model, INIT_ID);
    return _this;
  }

  ModalSlider.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var model = nextProps.model,
        INIT_ID = nextProps.INIT_ID;
    return model !== prevState.model ? _crInitialState(model, INIT_ID) : null;
  };

  var _proto = ModalSlider.prototype;

  _proto.render = function render() {
    var _pagesStyle = this._pagesStyle,
        _pageStyle = this._pageStyle,
        _this$props = this.props,
        isShow = _this$props.isShow,
        className = _this$props.className,
        rootStyle = _this$props.rootStyle,
        style = _this$props.style,
        onClose = _this$props.onClose,
        _transform = this._crTransform(),
        _showHideStyle = (0, _extends2["default"])({}, style, S.SHOW_HIDE, _pageStyle),
        _divStyle = (0, _extends2["default"])({}, S.PAGES, _pagesStyle, _transform);

    return /*#__PURE__*/_react["default"].createElement(_ModalPane["default"], {
      isShow: isShow,
      style: rootStyle,
      onClose: onClose
    }, /*#__PURE__*/_react["default"].createElement(_ShowHide["default"], {
      className: className,
      style: _showHideStyle,
      isShow: isShow
    }, /*#__PURE__*/_react["default"].createElement("div", {
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