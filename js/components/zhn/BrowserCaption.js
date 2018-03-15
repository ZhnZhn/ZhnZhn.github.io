'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgClose = require('./SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    position: 'relative',
    //backgroundColor: '#232F3B',
    backgroundColor: '#1B2836',
    color: 'rgba(164, 135, 212, 1)',
    lineHeight: '1.8',
    paddingTop: '4px',
    paddingLeft: '10px',
    paddingRight: '42px',
    marginBottom: '10px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px'
  },
  CAPTION: {
    //color: 'lightslategray',
    color: 'silver',
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: '6px',
    right: 0
  }
};
//import PropTypes from "prop-types";

var BrowserCaption = function BrowserCaption(_ref) {
  var caption = _ref.caption,
      children = _ref.children,
      onClose = _ref.onClose;
  return _react2.default.createElement(
    'div',
    { style: STYLE.ROOT },
    _react2.default.createElement(
      'span',
      {
        className: 'not-selected',
        style: STYLE.CAPTION
      },
      caption
    ),
    children,
    _react2.default.createElement(_SvgClose2.default, {
      style: STYLE.SVG_CLOSE,
      onClose: onClose
    })
  );
};
/*
BrowserCaption.propTypes = {
  caption: PropTypes.string,
  onClose: PropTypes.func
}
*/

exports.default = BrowserCaption;
//# sourceMappingURL=BrowserCaption.js.map