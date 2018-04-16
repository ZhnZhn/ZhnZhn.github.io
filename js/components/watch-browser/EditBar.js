'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ButtonCircle = require('../zhn/ButtonCircle');

var _ButtonCircle2 = _interopRequireDefault(_ButtonCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL_BT = "bt__watch__bar";

var S = {
  ROOT: {
    marginBottom: '10px'
  },
  BT_LIST: {
    marginLeft: '20px'
  }
};

var EditBar = function EditBar(_ref) {
  var isShow = _ref.isShow,
      onClickGroup = _ref.onClickGroup,
      onClickList = _ref.onClickList;

  if (isShow) {
    return _react2.default.createElement(
      'div',
      { style: S.ROOT },
      _react2.default.createElement(_ButtonCircle2.default, {
        caption: 'GROUP',
        isWithoutDefault: true,
        className: CL_BT,
        onClick: onClickGroup
      }),
      _react2.default.createElement(_ButtonCircle2.default, {
        caption: 'LIST',
        isWithoutDefault: true,
        className: CL_BT,
        style: S.BT_LIST,
        onClick: onClickList
      })
    );
  } else {
    return null;
  }
};

exports.default = EditBar;
//# sourceMappingURL=EditBar.js.map