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

var CheckBoxList = function CheckBoxList(_ref) {
  var selectProps = _ref.selectProps,
      crIsId = _ref.crIsId,
      _onToggle = _ref.onToggle;
  return selectProps.map(function (item) {
    return _react2.default.createElement(_RowCheckBox2.default, {
      key: item.id,
      initValue: false,
      rootStyle: S.ROW_CB,
      caption: item.caption,
      onToggle: function onToggle() {
        return _onToggle(crIsId(item.id));
      }
    });
  });
};

var PaneToggle = function PaneToggle(_ref2) {
  var isShow = _ref2.isShow,
      style = _ref2.style,
      _ref2$className = _ref2.className,
      className = _ref2$className === undefined ? CL : _ref2$className,
      _ref2$selectProps = _ref2.selectProps,
      selectProps = _ref2$selectProps === undefined ? [] : _ref2$selectProps,
      isShowDate = _ref2.isShowDate,
      crIsId = _ref2.crIsId,
      _onToggle2 = _ref2.onToggle,
      onClose = _ref2.onClose;
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
      _react2.default.createElement(CheckBoxList, {
        selectProps: selectProps,
        crIsId: crIsId,
        onToggle: _onToggle2
      }),
      _react2.default.createElement(_RowCheckBox2.default, {
        key: 'isForDate',
        value: isShowDate,
        rootStyle: S.ROW_CB,
        caption: 'For Date',
        onToggle: function onToggle() {
          return _onToggle2('isShowDate');
        }
      })
    )
  );
};

exports.default = PaneToggle;
//# sourceMappingURL=PaneToggle.js.map