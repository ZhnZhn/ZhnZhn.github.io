"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));
var _Page = _interopRequireDefault(require("./Page"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const _isArr = Array.isArray,
  FOCUS_FIRST_MLS = 1000;
const _crId = (dfProps, rootId, id) => dfProps.lT === 'SDN' ? id || rootId : rootId ? `${rootId}/${id}` : id;
const _fOnClick = (proxy, rootId, dfProps, pageNumber, onClickNext, fOnClickItem, item) => {
  const {
      text,
      id,
      type
    } = item,
    _id = _crId(dfProps, rootId, id);
  return type === 'l' ? (0, _uiApi.bindTo)(onClickNext, _id, text, pageNumber) : fOnClickItem({
    id: _id,
    ...dfProps,
    text,
    proxy
  });
};
const Frame = _ref => {
  let {
    style,
    title,
    id = '',
    dfProps = {},
    pageNumber,
    pageCurrent,
    onClickPrev,
    onClickNext,
    fOnClickItem,
    loadItems,
    getProxy
  } = _ref;
  const _refTitle = (0, _uiApi.useRef)(),
    _refId = (0, _uiApi.useRef)(),
    [state, setState] = (0, _uiApi.useState)({}),
    {
      model,
      errMsg
    } = state,
    proxy = getProxy(dfProps.lT)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _fOnClickItem = (0, _uiApi.useCallback)((0, _uiApi.bindTo)(_fOnClick, proxy, id, dfProps, pageNumber, onClickNext, fOnClickItem), [proxy])
    /*eslint-enable react-hooks/exhaustive-deps */,
    _isTitle = pageNumber !== 0 && title && onClickPrev,
    _isFocusTitle = pageNumber === pageCurrent && (_isTitle || !_isTitle && model);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (title) {
      loadItems(proxy, dfProps, id).then(model => {
        const _nextState = _isArr(model) ? {
          model
        } : {
          errMsg: 'Response is not array'
        };
        setState(_nextState);
      }).catch(err => setState({
        errMsg: err.message
      }));
    }
    return () => {
      clearTimeout((0, _uiApi.getRefValue)(_refId));
      (0, _uiApi.setRefValue)(_refTitle, null);
    };
  }, []);
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(() => {
    if (_isFocusTitle) {
      clearTimeout((0, _uiApi.getRefValue)(_refId));
      (0, _uiApi.setRefValue)(_refId, setTimeout(() => {
        (0, _uiApi.focusRefElement)(_refTitle);
      }, FOCUS_FIRST_MLS));
    }
  }, [_isFocusTitle]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ..._Style.S_FRAME,
      ...style
    },
    children: [_isTitle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTitle.default, {
      innerRef: _refTitle,
      title: title,
      onClick: (0, _uiApi.bindTo)(onClickPrev, pageNumber)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Page.default, {
      refFirstItem: !_isTitle ? _refTitle : void 0,
      model: model,
      fOnClickItem: _fOnClickItem,
      errMsg: errMsg
    })]
  });
};
var _default = exports.default = Frame;
//# sourceMappingURL=Frame.js.map