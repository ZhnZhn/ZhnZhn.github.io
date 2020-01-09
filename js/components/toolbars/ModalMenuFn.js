"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _SubMenuItem = _interopRequireDefault(require("./SubMenuItem"));

var _ModalMenu = _interopRequireDefault(require("./ModalMenu.Style"));

var mlsToDmy = _DateUtils["default"].mlsToDmy;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isMinMax = function _isMinMax(config) {
  return config.yAxis && config.yAxis.plotLines && config.yAxis.plotLines.length > 0 ? true : false;
};

var EPOCH_DMY = '01-01-1970';

var _isZoom = function _isZoom(getChart) {
  if (!_isFn(getChart)) {
    return false;
  }

  var chart = getChart();

  if (!chart || !_isFn(chart.zhGetFromToDates)) {
    return false;
  }

  var _chart$zhGetFromToDat = chart.zhGetFromToDates({
    format: mlsToDmy
  }),
      from = _chart$zhGetFromToDat.from,
      to = _chart$zhGetFromToDat.to;

  return from === to && to === EPOCH_DMY ? false : true;
};

var ModalMenuFn = function ModalMenuFn(_ref) {
  var style = _ref.style,
      isShow = _ref.isShow,
      onClose = _ref.onClose,
      config = _ref.config,
      getChart = _ref.getChart,
      onX2H = _ref.onX2H,
      onMinMax = _ref.onMinMax,
      onZoom = _ref.onZoom,
      onCopy = _ref.onCopy,
      onPasteTo = _ref.onPasteTo;
  return _react["default"].createElement(_ModalPopup["default"], {
    isShow: isShow,
    style: (0, _extends2["default"])({}, _ModalMenu["default"].ROOT, {}, style),
    onClose: onClose
  }, _react["default"].createElement("div", {
    style: _ModalMenu["default"].PANE
  }, _react["default"].createElement(_SubMenuItem["default"], {
    caption: "x2H",
    onClick: onX2H
  }), _isMinMax(config) && _react["default"].createElement(_SubMenuItem["default"], {
    caption: "MinMax",
    initialIsActive: true,
    onClick: onMinMax
  }), _isZoom(getChart) && _react["default"].createElement(_SubMenuItem["default"], {
    caption: "Zoom",
    isNotActive: true,
    onClick: onZoom,
    onClose: onClose
  }), _react["default"].createElement(_SubMenuItem["default"], {
    caption: "Copy",
    isNotActive: true,
    onClick: onCopy,
    onClose: onClose
  }), _react["default"].createElement(_SubMenuItem["default"], {
    caption: "PasteTo",
    isNotActive: true,
    onClick: onPasteTo,
    onClose: onClose
  })));
};

var _default = ModalMenuFn;
exports["default"] = _default;
//# sourceMappingURL=ModalMenuFn.js.map