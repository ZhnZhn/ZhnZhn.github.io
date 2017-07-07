'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  LOAD: {
    color: '#607D8B'
  },
  SHOW: {
    color: 'rgb(35, 47, 59)'
  }
};

var Load = function Load(_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(_FlatButton2.default, {
    rootStyle: S.LOAD,
    caption: 'Load',
    title: 'Load Item to Pane Container'
    //accessKey="l"
    , onClick: onClick
  });
};

var Show = function Show(_ref2) {
  var onClick = _ref2.onClick;
  return _react2.default.createElement(_FlatButton2.default, {
    rootStyle: S.SHOW,
    caption: 'Show',
    title: 'Show Pane Container'
    //accessKey="s"
    , onClick: onClick
  });
};

exports.default = { Load: Load, Show: Show, Flat: _FlatButton2.default };
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\Button.js.map