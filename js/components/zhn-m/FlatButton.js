'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CaptionInput = require('./CaptionInput');

var _CaptionInput2 = _interopRequireDefault(_CaptionInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};

var S = {
  PRIMARY: {
    color: '#607D8B'
  }
};

var FlatButton = function FlatButton(_ref) {
  var className = _ref.className,
      rootStyle = _ref.rootStyle,
      _ref$clDiv = _ref.clDiv,
      clDiv = _ref$clDiv === undefined ? CL.BT_DIV : _ref$clDiv,
      isPrimary = _ref.isPrimary,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? '' : _ref$title,
      caption = _ref.caption,
      accessKey = _ref.accessKey,
      children = _ref.children,
      onClick = _ref.onClick;

  var _style = isPrimary ? (0, _extends3.default)({}, rootStyle, S.PRIMARY) : rootStyle,
      _className = className ? CL.BT + ' ' + className : CL.BT;

  return _react2.default.createElement(
    'button',
    {
      className: _className,
      style: _style,
      type: 'button',
      tabIndex: 0,
      title: title,
      accessKey: accessKey,
      onClick: onClick
    },
    _react2.default.createElement(
      'div',
      { className: clDiv },
      _react2.default.createElement(_CaptionInput2.default, {
        className: CL.BT_SPAN,
        caption: caption,
        accessKey: accessKey
      }),
      children
    )
  );
};

exports.default = FlatButton;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-m\FlatButton.js.map