'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _ModalPopup = require('../zhn-moleculs/ModalPopup');

var _ModalPopup2 = _interopRequireDefault(_ModalPopup);

var _SubMenuItem = require('./SubMenuItem');

var _SubMenuItem2 = _interopRequireDefault(_SubMenuItem);

var _ModalMenu = require('./ModalMenu.Style');

var _ModalMenu2 = _interopRequireDefault(_ModalMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mlsToDmy = _DateUtils2.default.mlsToDmy;


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
  var isShow = _ref.isShow,
      onClose = _ref.onClose,
      config = _ref.config,
      getChart = _ref.getChart,
      onX2H = _ref.onX2H,
      onMinMax = _ref.onMinMax,
      onZoom = _ref.onZoom,
      onCopy = _ref.onCopy,
      onPasteTo = _ref.onPasteTo;
  return _react2.default.createElement(
    _ModalPopup2.default,
    {
      isShow: isShow,
      style: _ModalMenu2.default.ROOT,
      onClose: onClose
    },
    _react2.default.createElement(
      'div',
      { style: _ModalMenu2.default.PANE },
      _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'x2H',
        onClick: onX2H
      }),
      _isMinMax(config) && _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'MinMax',
        initialIsActive: true,
        onClick: onMinMax
      }),
      _isZoom(getChart) && _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'Zoom',
        isNotActive: true,
        onClick: onZoom,
        onClose: onClose
      }),
      _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'Copy',
        isNotActive: true,
        onClick: onCopy,
        onClose: onClose
      }),
      _react2.default.createElement(_SubMenuItem2.default, {
        caption: 'PasteTo',
        isNotActive: true,
        onClick: onPasteTo,
        onClose: onClose
      })
    )
  );
};

exports.default = ModalMenuFn;
//# sourceMappingURL=ModalMenuFn.js.map