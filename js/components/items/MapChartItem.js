"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useBool = _interopRequireDefault(require("../hooks/useBool"));

var _ChoroplethMap = _interopRequireDefault(require("../../adapters/eurostat/ChoroplethMap"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _PanelDataInfo = _interopRequireDefault(require("./PanelDataInfo"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const S_ROOT_DIV = {
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
};

const BtTabInfo = ({
  isShow,
  onClick
}) => {
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

const _crMapId = caption => "map_" + caption;

const MapChartItem = ({
  caption,
  config,
  onCloseItem
}) => {
  const [state, setState] = (0, _react.useState)({
    isLoading: true,
    time: ''
  }),
        {
    isLoading,
    time
  } = state,
        [isOpen, toggleIsOpen] = (0, _useToggle.default)(true),
        [isShowInfo, showInfo, hideInfo] = (0, _useBool.default)();
  (0, _react.useEffect)(() => {
    const {
      json: jsonCube,
      zhMapSlice,
      zhDialog
    } = config,
          {
      time
    } = zhDialog || {};
    /*eslint-disable react-hooks/exhaustive-deps */

    _ChoroplethMap.default.draw({
      id: _crMapId(caption),
      jsonCube,
      zhMapSlice,
      time
    }).then(({
      time
    }) => {
      setState({
        isLoading: false,
        time
      });
    }).catch(err => {
      setState({
        isLoading: false
      });
    });
  }, []); // config, caption

  /*eslint-enable react-hooks/exhaustive-deps */

  const _mapId = _crMapId(caption),
        {
    zhDialog,
    info
  } = config,
        {
    itemCaption
  } = zhDialog || {},
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: _mapId,
        style: { ...S_MAP_DIV,
          ..._styleMap
        },
        children: isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.SpinnerLoading, {
          style: S_SPINNER_LOADING
        })
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