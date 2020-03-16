"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));

var _MenuList = _interopRequireDefault(require("./MenuList"));

var _ErrMsg = _interopRequireDefault(require("./ErrMsg"));

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
  var store = _ref.store,
      title = _ref.title,
      id = _ref.id,
      rootStyle = _ref.rootStyle,
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
      _useState = (0, _react.useState)({
    model: [],
    errMsg: null
  }),
      state = _useState[0],
      setState = _useState[1],
      model = state.model,
      errMsg = state.errMsg,
      proxy = _getProxy(store, dfProps),
      _fOnClickItem = (0, _react.useCallback)(_fOnClick.bind(null, proxy, id, dfProps, pageNumber, onClickNext, fOnClickItem), [proxy]);

  (0, _react.useEffect)(function () {
    if (title) {
      loadItems(dfProps.rootUrl + "/" + id, proxy).then(function (model) {
        if (_isArr(model)) {
          setState({
            model: model,
            errMsg: null
          });
        } else {
          throw new Error('Response is not array');
        }
      })["catch"](function (err) {
        return setState({
          model: [],
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
    if (pageNumber === pageCurrent) {
      _refId.current = setTimeout(function () {
        var _titleNode = _refTitle.current;

        if (_titleNode) {
          _titleNode.focus();
        }
      }, FOCUS_FIRST_MLS);
    }
  }, [pageNumber, pageCurrent]);
  return _react["default"].createElement("div", {
    style: rootStyle
  }, _react["default"].createElement(_MenuTitle["default"], {
    innerRef: _refTitle,
    title: title,
    onClick: onClickPrev.bind(null, pageNumber)
  }), _react["default"].createElement(_MenuList["default"], {
    model: model,
    fOnClickItem: _fOnClickItem
  }), _react["default"].createElement(_ErrMsg["default"], {
    errMsg: errMsg
  }));
};

var _default = Frame;
exports["default"] = _default;
//# sourceMappingURL=Frame.js.map