'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalPopup = require('../zhn-moleculs/ModalPopup');

var _ModalPopup2 = _interopRequireDefault(_ModalPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  POPUP: "popup-menu",
  ROW: "row__pane-topic",
  BT: "bt__left"
};

var S = {
  POPUP: {
    top: '36px',
    left: '8px',
    zIndex: 20
  },
  ROOT: {
    width: '180px'
  }
};

var ChartMorePopup = function ChartMorePopup(_ref) {
  var isShow = _ref.isShow,
      onClose = _ref.onClose,
      onResizeToMin = _ref.onResizeToMin,
      onResizeToInit = _ref.onResizeToInit,
      onPlusWidth = _ref.onPlusWidth,
      onMinusWidth = _ref.onMinusWidth,
      onFit = _ref.onFit;
  return _react2.default.createElement(
    _ModalPopup2.default,
    {
      className: CL.POPUP,
      style: S.POPUP,
      isShow: isShow,
      onClose: onClose
    },
    _react2.default.createElement(
      'div',
      { style: S.ROOT },
      _react2.default.createElement(
        'div',
        { className: CL.ROW },
        _react2.default.createElement(
          'button',
          {
            className: CL.BT,
            onClick: onResizeToMin
          },
          'Resize to minWidth'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: CL.ROW },
        _react2.default.createElement(
          'button',
          {
            className: CL.BT,
            onClick: onResizeToInit
          },
          'Resize to initWidth'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: CL.ROW },
        _react2.default.createElement(
          'button',
          {
            className: CL.BT,
            onClick: onPlusWidth
          },
          '+10px to Width'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: CL.ROW },
        _react2.default.createElement(
          'button',
          {
            className: CL.BT,
            onClick: onMinusWidth
          },
          '-10px to Width'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: CL.ROW },
        _react2.default.createElement(
          'button',
          {
            className: CL.BT,
            onClick: onFit
          },
          'Items to Width'
        )
      )
    )
  );
};

exports.default = ChartMorePopup;
//# sourceMappingURL=ChartMorePopup.js.map