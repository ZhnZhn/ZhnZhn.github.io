"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

var _ChoroplethMap = _interopRequireDefault(require("../../adapters/eurostat/ChoroplethMap"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _PanelDataInfo = _interopRequireDefault(require("./PanelDataInfo"));

//import PropTypes from "prop-types";
var S = {
  ROOT_DIV: {
    position: 'relative',
    marginBottom: 10,
    marginRight: 12
  },
  TIME: {
    display: 'inline-block',
    color: '#fdb316',
    paddingLeft: 16,
    fontWeight: 'bold'
  },
  TAB_DIV: {
    position: 'relative',
    height: 30,
    backgroundColor: 'transparent',
    zIndex: 2
  },
  MAP_DIV: {
    height: 400
  },
  SPINNER_LOADING: {
    margin: '64px auto 0'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

var BtTabInfo = function BtTabInfo(_ref) {
  var isShow = _ref.isShow,
      onClick = _ref.onClick;

  if (!isShow) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S.TAB_DIV,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].ButtonTab, {
      caption: "Info",
      onClick: onClick
    })
  });
};

var _crMapId = function _crMapId(caption) {
  return "map_" + caption;
};

var MapChartItem = function MapChartItem(_ref2) {
  var caption = _ref2.caption,
      config = _ref2.config,
      onCloseItem = _ref2.onCloseItem;

  var _useState = (0, _react.useState)({
    isLoading: true,
    time: ''
  }),
      state = _useState[0],
      setState = _useState[1],
      isLoading = state.isLoading,
      time = state.time,
      _useToggle = (0, _useToggle2["default"])(true),
      isOpen = _useToggle[0],
      toggleIsOpen = _useToggle[1],
      _useState2 = (0, _react.useState)(false),
      isShowInfo = _useState2[0],
      setIsShowInfo = _useState2[1],
      _hClickInfo = (0, _react.useCallback)(function () {
    return setIsShowInfo(true);
  }, []),
      _hClickChart = (0, _react.useCallback)(function () {
    return setIsShowInfo(false);
  }, []);

  (0, _react.useEffect)(function () {
    var jsonCube = config.json,
        zhMapSlice = config.zhMapSlice,
        _config$zhDialog = config.zhDialog,
        zhDialog = _config$zhDialog === void 0 ? {} : _config$zhDialog,
        time = zhDialog.time;
    /*eslint-disable react-hooks/exhaustive-deps */

    _ChoroplethMap["default"].draw({
      id: _crMapId(caption),
      jsonCube: jsonCube,
      zhMapSlice: zhMapSlice,
      time: time
    }).then(function (_ref3) {
      var time = _ref3.time;
      setState({
        isLoading: false,
        time: time
      });
    })["catch"](function (err) {
      setState({
        isLoading: false
      });
    });
  }, []); // config, caption

  /*eslint-enable react-hooks/exhaustive-deps */

  var _mapId = _crMapId(caption),
      zhDialog = config.zhDialog,
      info = config.info,
      _ref4 = zhDialog || {},
      _ref4$itemCaption = _ref4.itemCaption,
      itemCaption = _ref4$itemCaption === void 0 ? '' : _ref4$itemCaption,
      _styleMap = isShowInfo ? S.NONE : S.BLOCK;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.ROOT_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemHeader["default"], {
      isOpen: isOpen,
      caption: itemCaption,
      onClick: toggleIsOpen,
      onClose: onCloseItem,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S.TIME,
        children: time
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp["default"].ShowHide, {
      isShow: isOpen,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BtTabInfo, {
        isShow: !isShowInfo,
        onClick: _hClickInfo
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: _mapId,
        style: (0, _extends2["default"])({}, S.MAP_DIV, _styleMap),
        children: isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].SpinnerLoading, {
          style: S.SPINNER_LOADING
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PanelDataInfo["default"], {
        isShow: isShowInfo,
        info: info,
        onClickChart: _hClickChart
      })]
    })]
  });
};
/*
MapChartItem.propTypes = {
  caption: PropTypes.string,
  config: PropTypes.shape({
    json: PropTypes.object,
    zhMapSlice: PropTypes.object,
    zhDialog: PropTypes.shape({
      subtitle: PropTypes.string,
      time: PropTypes.string
    })
  }),
  onCloseItem: PropTypes.func
}
*/


var _default = MapChartItem;
exports["default"] = _default;
//# sourceMappingURL=MapChartItem.js.map