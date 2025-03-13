"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useInitStateFromProps = _interopRequireDefault(require("../hooks/useInitStateFromProps"));
var _useThrottleCallback = _interopRequireDefault(require("../hooks/useThrottleCallback"));
var _ModalPane = _interopRequireDefault(require("../zhn-moleculs/ModalPane"));
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _MenuPage = _interopRequireDefault(require("./MenuPage"));
var _MenuPages = _interopRequireDefault(require("./MenuPages"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SLIDER_PAGES = "slider-pages",
  S_SHOW_HIDE = {
    position: 'absolute',
    overflow: 'hidden'
  },
  DF_INIT_ID = 'p0',
  DF_MODEL = {
    pageWidth: 100,
    maxPages: 2,
    initId: DF_INIT_ID,
    p0: []
  };
const _crWidthStyle = v => ({
  width: v
});
const _addPage = (model, pages, id, title) => {
  pages.push(/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuPage.default, {
    title: title,
    items: model[id],
    titleCl: model.titleCl,
    itemCl: model.itemCl
  }, id));
};
const _initState = model => {
  const _pW = model.pageWidth,
    _initId = model.initId || DF_INIT_ID;
  return {
    addPage: (0, _uiApi.bindTo)(_addPage, model),
    pageWidth: _pW,
    pageStyle: _crWidthStyle(_pW),
    pageCurrent: 1,
    pages: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuPage.default, {
      items: model[_initId],
      titleCl: model.titleCl,
      itemCl: model.itemCl
    }, _initId)]
  };
};
const ModalSlider = _ref => {
  let {
    model = DF_MODEL,
    isShow,
    className,
    rootStyle,
    style,
    onClose
  } = _ref;
  const [state, setState] = (0, _useInitStateFromProps.default)(_initState, model),
    {
      pageWidth,
      pageStyle,
      pageCurrent,
      pages
    } = state,
    hPrevPage = (0, _useThrottleCallback.default)(pageNumber => {
      setState(prevState => {
        prevState.pageCurrent = pageNumber - 1;
        return {
          ...prevState
        };
      });
    }),
    hNextPage = (0, _useThrottleCallback.default)((id, title, pageNumber) => {
      setState(prevState => {
        const {
            addPage,
            pages
          } = prevState,
          _max = pages.length - 1;
        if (_max + 1 > pageNumber) {
          if (pages[pageNumber] && pages[pageNumber].key !== id) {
            if (pageNumber > 0) {
              prevState.pages.splice(pageNumber);
            } else {
              prevState.pages = [];
            }
            addPage(prevState.pages, id, title);
          }
        } else {
          addPage(pages, id, title);
        }
        prevState.pageCurrent = pageNumber + 1;
        return {
          ...prevState
        };
      });
    });
  const _showHideStyle = {
      ...style,
      ...S_SHOW_HIDE,
      ...pageStyle
    },
    _divStyle = (0, _styleFn.crSliderTransformStyle)(pageWidth, pageCurrent);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    isShow: isShow,
    style: rootStyle,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      className: className,
      style: _showHideStyle,
      isShow: isShow,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_SLIDER_PAGES,
        style: _divStyle,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuPages.default, {
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
var _default = exports.default = ModalSlider;
//# sourceMappingURL=ModalSlider.js.map