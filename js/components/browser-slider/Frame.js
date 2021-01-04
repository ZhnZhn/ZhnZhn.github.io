"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));

var _Page = _interopRequireDefault(require("./Page"));

var FOCUS_FIRST_MLS = 1000;
var _isArr = Array.isArray;

var _getProxy = function _getProxy(store, dfProps) {
  return store.getProxy(dfProps.lT);
};

var _fOnClick = function _fOnClick(proxy, rootId, dfProps, pageNumber, onClickNext, fOnClickItem, item) {
  var text = item.text,
      id = item.id,
      type = item.type;
  return type === 'l' ? onClickNext.bind(null, rootId + "/" + id, text, pageNumber) : fOnClickItem((0, _extends2["default"])({
    id: rootId + "/" + id
  }, dfProps, {
    text: text,
    proxy: proxy
  }));
};

var Frame = function Frame(_ref) {
  var style = _ref.style,
      store = _ref.store,
      title = _ref.title,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? '' : _ref$id,
      _ref$dfProps = _ref.dfProps,
      dfProps = _ref$dfProps === void 0 ? {} : _ref$dfProps,
      pageNumber = _ref.pageNumber,
      pageCurrent = _ref.pageCurrent,
      onClickPrev = _ref.onClickPrev,
      onClickNext = _ref.onClickNext,
      fOnClickItem = _ref.fOnClickItem,
      loadItems = _ref.loadItems;

  var _refTitle = (0, _react.useRef)(),
      _refId = (0, _react.useRef)(),
      _useState = (0, _react.useState)({}),
      state = _useState[0],
      setState = _useState[1],
      model = state.model,
      errMsg = state.errMsg,
      proxy = _getProxy(store, dfProps),
      _fOnClickItem = (0, _react.useCallback)(_fOnClick.bind(null, proxy, id, dfProps, pageNumber, onClickNext, fOnClickItem), [proxy]),
      _isTitle = title && onClickPrev,
      _isFocusTitle = pageNumber === pageCurrent && (_isTitle || !_isTitle && model);

  (0, _react.useEffect)(function () {
    if (title) {
      loadItems(dfProps.rootUrl + "/" + id, proxy).then(function (model) {
        var _nextState = _isArr(model) ? {
          model: model
        } : {
          errMsg: 'Response is not array'
        };

        setState(_nextState);
      })["catch"](function (err) {
        return setState({
          errMsg: err.message
        });
      });
    }

    return function () {
      clearTimeout(_refId.current);
      _refTitle.current = null;
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (_isFocusTitle) {
      clearTimeout(_refId.current);
      _refId.current = setTimeout(function () {
        var _titleNode = _refTitle.current;

        if (_titleNode) {
          _titleNode.focus();
        }
      }, FOCUS_FIRST_MLS);
    }
  }, [_isFocusTitle]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [_isTitle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTitle["default"], {
      innerRef: _refTitle,
      title: title,
      onClick: onClickPrev.bind(null, pageNumber)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Page["default"], {
      refFirstItem: !_isTitle ? _refTitle : void 0,
      model: model,
      fOnClickItem: _fOnClickItem,
      errMsg: errMsg
    })]
  });
};

var _default = Frame;
exports["default"] = _default;
//# sourceMappingURL=Frame.js.map