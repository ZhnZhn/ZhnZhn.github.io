"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

var _useBool2 = _interopRequireDefault(require("../hooks/useBool"));

var _ChoroplethMap = _interopRequireDefault(require("../../adapters/eurostat/ChoroplethMap"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _PanelDataInfo = _interopRequireDefault(require("./PanelDataInfo"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var S_ROOT_DIV = {
  position: 'relative',
  margin: '0 12px 10px 0'
},
    S_TIME = {
  display: 'inline-block',
  color: '#fdb316',
  paddingLeft: 16,
  fontWeight: 'bold'
},
    S_TAB_DIV = {
  position: 'relative',
  height: 30,
  backgroundColor: 'transparent',
  zIndex: 2
},
    S_MAP_DIV = {
  height: 400
},
    S_SPINNER_LOADING = {
  margin: '64px auto 0'
},
    S_BLOCK = {
  display: 'block'
},
    S_NONE = {
  display: 'none'
},
    S_ERR_MSG = {
  paddingLeft: 12
},
    CL_ERR_MSG = "err-msg",
    ERR_MSG = "Error during loading map.";

var ErrMsg = function ErrMsg() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: CL_ERR_MSG,
    style: S_ERR_MSG,
    children: ERR_MSG
  });
};

var BtTabInfo = function BtTabInfo(_ref) {
  var isShow = _ref.isShow,
      onClick = _ref.onClick;

  if (!isShow) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_TAB_DIV,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ButtonTab, {
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
      isErr = state.isErr,
      _useToggle = (0, _useToggle2.default)(true),
      isOpen = _useToggle[0],
      toggleIsOpen = _useToggle[1],
      _useBool = (0, _useBool2.default)(),
      isShowInfo = _useBool[0],
      showInfo = _useBool[1],
      hideInfo = _useBool[2];

  (0, _react.useEffect)(function () {
    var jsonCube = config.json,
        zhMapSlice = config.zhMapSlice,
        zhDialog = config.zhDialog,
        _ref3 = zhDialog || {},
        time = _ref3.time;
    /*eslint-disable react-hooks/exhaustive-deps */


    _ChoroplethMap.default.draw({
      id: _crMapId(caption),
      jsonCube: jsonCube,
      zhMapSlice: zhMapSlice,
      time: time
    }).then(function (_ref4) {
      var time = _ref4.time;
      setState({
        isLoading: false,
        time: time
      });
    }).catch(function (err) {
      setState({
        isLoading: false,
        isErr: true
      });
    });
  }, []); // config, caption

  /*eslint-enable react-hooks/exhaustive-deps */

  var _mapId = _crMapId(caption),
      zhDialog = config.zhDialog,
      info = config.info,
      _ref5 = zhDialog || {},
      itemCaption = _ref5.itemCaption,
      _styleMap = isShowInfo ? S_NONE : S_BLOCK;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemHeader.default, {
      isOpen: isOpen,
      caption: itemCaption,
      onClick: toggleIsOpen,
      onClose: onCloseItem,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_TIME,
        children: time
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp.default.ShowHide, {
      isShow: isOpen,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BtTabInfo, {
        isShow: !isShowInfo,
        onClick: showInfo
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        id: _mapId,
        style: Object.assign({}, S_MAP_DIV, _styleMap),
        children: [isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.SpinnerLoading, {
          style: S_SPINNER_LOADING
        }), isErr && /*#__PURE__*/(0, _jsxRuntime.jsx)(ErrMsg, {})]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PanelDataInfo.default, {
        isShow: isShowInfo,
        info: info,
        onClickChart: hideInfo
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
exports.default = _default;
//# sourceMappingURL=MapChartItem.js.map