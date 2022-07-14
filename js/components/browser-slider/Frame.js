"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));

var _Page = _interopRequireDefault(require("./Page"));

var _Style = require("./Style");

var _jsxRuntime = require("react/jsx-runtime");

const FOCUS_FIRST_MLS = 1000;
const _isArr = Array.isArray;

const _getProxy = (store, dfProps) => store.getProxy(dfProps.lT);

const _fOnClick = (proxy, rootId, dfProps, pageNumber, onClickNext, fOnClickItem, item) => {
  const {
    text,
    id,
    type
  } = item,
        _id = dfProps.lT === 'SDN' ? id || rootId : rootId ? rootId + "/" + id : id;

  return type === 'l' ? onClickNext.bind(null, _id, text, pageNumber) : fOnClickItem({
    id: _id,
    ...dfProps,
    text,
    proxy
  });
};

const Frame = _ref => {
  let {
    style,
    store,
    title,
    id = '',
    dfProps = {},
    pageNumber,
    pageCurrent,
    onClickPrev,
    onClickNext,
    fOnClickItem,
    loadItems
  } = _ref;

  const _refTitle = (0, _uiApi.useRef)(),
        _refId = (0, _uiApi.useRef)(),
        [state, setState] = (0, _uiApi.useState)({}),
        {
    model,
    errMsg
  } = state,
        proxy = _getProxy(store, dfProps),
        _fOnClickItem = (0, _uiApi.useCallback)(_fOnClick.bind(null, proxy, id, dfProps, pageNumber, onClickNext, fOnClickItem), [proxy]),
        _isTitle = pageNumber !== 0 && title && onClickPrev,
        _isFocusTitle = pageNumber === pageCurrent && (_isTitle || !_isTitle && model);

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
  (0, _uiApi.useEffect)(() => {
    if (_isFocusTitle) {
      clearTimeout((0, _uiApi.getRefValue)(_refId));
      (0, _uiApi.setRefValue)(_refId, setTimeout(() => {
        (0, _uiApi.focusRefElement)(_refTitle);
      }, FOCUS_FIRST_MLS));
    }
  }, [_isFocusTitle]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: { ..._Style.S_FRAME,
      ...style
    },
    children: [_isTitle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTitle.default, {
      innerRef: _refTitle,
      title: title,
      onClick: onClickPrev.bind(null, pageNumber)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Page.default, {
      refFirstItem: !_isTitle ? _refTitle : void 0,
      model: model,
      fOnClickItem: _fOnClickItem,
      errMsg: errMsg
    })]
  });
};

var _default = Frame;
exports.default = _default;
//# sourceMappingURL=Frame.js.map