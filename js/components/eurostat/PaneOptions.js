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

var _RowCheckBox = require('../dialogs/RowCheckBox');

var _RowCheckBox2 = _interopRequireDefault(_RowCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = 'popup-menu';

var S = {
  ROOT: {
    left: 8,
    zIndex: 100,
    padding: 12
  },
  ROW_CB: {
    paddingLeft: 0
  }
};

var PaneOptions = function PaneOptions(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? CL : _ref$className,
      toggleOption = _ref.toggleOption,
      onClose = _ref.onClose;

  var _toggleZoomMinMax = toggleOption.bind(null, 'isNotZoomToMinMax'),
      _toggleFilterZero = toggleOption.bind(null, 'isFilterZero');
  return _react2.default.createElement(
    _ModalPopup2.default,
    {
      isShow: isShow,
      style: (0, _extends3.default)({}, S.ROOT, style),
      className: className,
      onClose: onClose
    },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_RowCheckBox2.default, {
        initValue: false,
        rootStyle: S.ROW_CB,
        caption: 'Not Zoom to Min-Max',
        onToggle: _toggleZoomMinMax
      }),
      _react2.default.createElement(_RowCheckBox2.default, {
        initValue: false,
        rootStyle: S.ROW_CB,
        caption: 'Filter Zero Values',
        onToggle: _toggleFilterZero
      })
    )
  );
};

exports.default = PaneOptions;
//# sourceMappingURL=PaneOptions.js.map