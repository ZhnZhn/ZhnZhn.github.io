'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgMore = require('./SvgMore');

var _SvgMore2 = _interopRequireDefault(_SvgMore);

var _SvgClose = require('./SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var CL = "gap-right";

var S = {
  ROOT: {
    position: 'relative',
    backgroundColor: '#1b2836',
    //color: 'rgba(164, 135, 212, 1)',
    lineHeight: '1.8',
    paddingTop: '4px',
    paddingLeft: '4px',
    paddingRight: '42px',
    marginBottom: '10px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'clip'
  },
  CAPTION: {
    color: 'silver',
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  },
  SVG_MORE: {
    fill: 'silver',
    stroke: 'silver'
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: '6px',
    right: 0
  }
};

var BrowserCaption = function BrowserCaption(_ref) {
  var isMore = _ref.isMore,
      caption = _ref.caption,
      children = _ref.children,
      onMore = _ref.onMore,
      onClose = _ref.onClose;
  return _react2.default.createElement(
    'div',
    { className: CL, style: S.ROOT },
    isMore && _react2.default.createElement(_SvgMore2.default, {
      svgStyle: S.SVG_MORE,
      onClick: onMore
    }),
    _react2.default.createElement(
      'span',
      {
        className: 'not-selected',
        style: S.CAPTION
      },
      caption
    ),
    children,
    _react2.default.createElement(_SvgClose2.default, {
      style: S.SVG_CLOSE,
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