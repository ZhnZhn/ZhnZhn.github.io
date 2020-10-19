"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

var _LegendItem = _interopRequireDefault(require("./LegendItem"));

var C = {
  CL_SCROLL: "with-scroll",
  MORE_MAX: 12,
  MORE: 'MORE',
  LESS: 'LESS'
};
var S = {
  MORE: {
    overflowY: 'auto',
    height: 250,
    paddingRight: 4,
    marginLeft: -8,
    transform: 'scaleX(-1)'
  },
  LESS: {
    height: 'auto'
  },
  DIV: {
    transform: 'scaleX(-1)'
  },
  BT_MORE: {
    display: 'inline-block',
    color: '#1b2836',
    marginTop: 10,
    marginLeft: 8,
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

var BtMore = function BtMore(_ref) {
  var isMore = _ref.isMore,
      legend = _ref.legend,
      onClick = _ref.onClick;
  var _len = legend.length;

  if (_len > C.MORE_MAX) {
    var _caption = isMore ? C.LESS + ': ' + C.MORE_MAX : C.MORE + ': +' + (_len - C.MORE_MAX);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      style: S.BT_MORE,
      onClick: onClick,
      children: _caption
    });
  } else {
    return null;
  }
};

var _renderLegend = function _renderLegend(legend, isMore, onClickItem) {
  var _legendItems = [],
      max = legend.length;
  var i = 0;

  for (; i < max; i++) {
    if (isMore || !isMore && i < C.MORE_MAX) {
      var item = legend[i];

      _legendItems.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendItem["default"], {
        item: item,
        onClickItem: onClickItem
      }, item.name));
    } else {
      break;
    }
  }

  return _legendItems;
};

var Legend = /*#__PURE__*/(0, _react.memo)(function (_ref2) {
  var _ref2$legend = _ref2.legend,
      legend = _ref2$legend === void 0 ? [] : _ref2$legend,
      onClickItem = _ref2.onClickItem;

  var _useToggle = (0, _useToggle2["default"])(false),
      isMore = _useToggle[0],
      toggleIsMore = _useToggle[1],
      _style = isMore ? S.MORE : (0, _extends2["default"])({}, S.MORE, S.LESS);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: C.CL_SCROLL,
    style: _style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.DIV,
      children: [_renderLegend(legend, isMore, onClickItem), /*#__PURE__*/(0, _jsxRuntime.jsx)(BtMore, {
        isMore: isMore,
        legend: legend,
        onClick: toggleIsMore
      })]
    })
  });
});
var _default = Legend;
exports["default"] = _default;
//# sourceMappingURL=Legend.js.map