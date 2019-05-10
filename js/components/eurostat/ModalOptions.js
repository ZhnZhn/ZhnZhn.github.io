'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalPopup = require('../zhn-moleculs/ModalPopup');

var _ModalPopup2 = _interopRequireDefault(_ModalPopup);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _Modal = require('./Modal.Style');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalOptions = function ModalOptions(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? _Modal2.default.CL : _ref$className,
      toggleOption = _ref.toggleOption,
      onClose = _ref.onClose;

  var _toggleZoomMinMax = toggleOption.bind(null, 'isNotZoomToMinMax'),
      _toggleFilterZero = toggleOption.bind(null, 'isFilterZero');
  return _react2.default.createElement(
    _ModalPopup2.default,
    {
      isShow: isShow,
      style: (0, _extends3.default)({}, _Modal2.default.ROOT, style),
      className: className,
      onClose: onClose
    },
    _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
      initValue: false,
      rootStyle: _Modal2.default.ROW_CB,
      caption: 'Not Zoom to Min-Max',
      onToggle: _toggleZoomMinMax
    }),
    _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
      initValue: false,
      rootStyle: _Modal2.default.ROW_CB,
      caption: 'Filter Zero Values',
      onToggle: _toggleFilterZero
    })
  );
};

exports.default = ModalOptions;
//# sourceMappingURL=ModalOptions.js.map