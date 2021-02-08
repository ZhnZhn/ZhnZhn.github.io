"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useHasMounted = _interopRequireDefault(require("../hooks/useHasMounted"));

var _throttleOnce = _interopRequireDefault(require("../../utils/throttleOnce"));

var _ModalPane = _interopRequireDefault(require("../zhn-moleculs/ModalPane"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _MenuPage = _interopRequireDefault(require("./MenuPage"));

var _MenuPages = _interopRequireDefault(require("./MenuPages"));

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

var DF_INIT_ID = 'p0';
var DF_MODEL = {
  pageWidth: 100,
  maxPages: 2,
  initId: DF_INIT_ID,
  p0: []
};

var _initState = function _initState(model) {
  var _pW = model.pageWidth,
      _maxP = model.maxPages,
      _initId = model.initId || DF_INIT_ID;

  return {
    pageWidth: _pW,
    pagesStyle: {
      width: _maxP * _pW + "px"
    },
    pageStyle: {
      width: _pW + "px"
    },
    pageCurrent: 1,
    pages: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuPage["default"], {
      items: model[_initId],
      titleCl: model.titleCl,
      itemCl: model.itemCl
    }, _initId)]
  };
};

var _addPage = function _addPage(pages, id, title, model) {
  pages.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuPage["default"], {
    title: title,
    items: model[id],
    titleCl: model.titleCl,
    itemCl: model.itemCl
  }, id));
};

var _crTransform = function _crTransform(pageWidth, pageCurrent) {
  var _dX = -1 * pageWidth * (pageCurrent - 1) + 0;

  return {
    transform: "translateX(" + _dX + "px)"
  };
};

var ModalSlider = function ModalSlider(_ref) {
  var _ref$model = _ref.model,
      model = _ref$model === void 0 ? DF_MODEL : _ref$model,
      isShow = _ref.isShow,
      className = _ref.className,
      rootStyle = _ref.rootStyle,
      style = _ref.style,
      onClose = _ref.onClose;

  var _useState = (0, _react.useState)(function () {
    return _initState(model);
  }),
      state = _useState[0],
      setState = _useState[1],
      pageWidth = state.pageWidth,
      pagesStyle = state.pagesStyle,
      pageStyle = state.pageStyle,
      pageCurrent = state.pageCurrent,
      pages = state.pages,
      hPrevPage = (0, _react.useCallback)((0, _throttleOnce["default"])(function (pageNumber) {
    setState(function (prevState) {
      prevState.pageCurrent = pageNumber - 1;
      return (0, _extends2["default"])({}, prevState);
    });
  }), []),
      hNextPage = (0, _react.useCallback)((0, _throttleOnce["default"])(function (id, title, pageNumber) {
    setState(function (prevState) {
      var pages = prevState.pages,
          _max = pages.length - 1;

      if (_max + 1 > pageNumber) {
        if (pages[pageNumber] && pages[pageNumber].key !== id) {
          if (pageNumber > 0) {
            prevState.pages.splice(pageNumber);
          } else {
            prevState.pages = [];
          }

          _addPage(prevState.pages, id, title, model);
        }
      } else {
        _addPage(pages, id, title, model);
      }

      prevState.pageCurrent = pageNumber + 1;
      return (0, _extends2["default"])({}, prevState);
    });
  }), [model]),
      _hasMounted = (0, _useHasMounted["default"])();
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(function () {
    if (!_hasMounted) {
      setState(_initState(model));
    }
  }, [model]); // _hasMounted

  /*eslint-enable react-hooks/exhaustive-deps */

  var _showHideStyle = (0, _extends2["default"])({}, style, S.SHOW_HIDE, pageStyle),
      _divStyle = (0, _extends2["default"])({}, S.PAGES, pagesStyle, _crTransform(pageWidth, pageCurrent));

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane["default"], {
    isShow: isShow,
    style: rootStyle,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide["default"], {
      className: className,
      style: _showHideStyle,
      isShow: isShow,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: _divStyle,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuPages["default"], {
          isShow: isShow,
          style: pageStyle,
          pages: pages,
          pageCurrent: pageCurrent,
          onNextPage: hNextPage,
          onPrevPage: hPrevPage,
          onClose: onClose
        })
      })
    })
  });
};

var _default = ModalSlider;
exports["default"] = _default;
//# sourceMappingURL=ModalSlider.js.map