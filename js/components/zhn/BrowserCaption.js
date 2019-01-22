'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _SvgMore = require('./SvgMore');

var _SvgMore2 = _interopRequireDefault(_SvgMore);

var _SvgCheckBox = require('./SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

var _SvgClose = require('./SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var TH_ID = 'ELEMENT';

var CL = {
  ROOT: 'gap-right',
  NOT_SELECTED: 'not-selected'
};

var S = {
  ROOT: {
    position: 'relative',
    backgroundColor: '#1b2836',
    //color: 'rgba(164, 135, 212, 1)',
    //color: 'silver'
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
    //color: 'silver',
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  },
  SVG_MORE: {
    fill: 'inherit',
    stroke: 'inherit'
    //fill: 'silver',
    //stroke: 'silver'
  },
  CHECK_BOX: {
    marginLeft: 10,
    marginRight: 10
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: '6px',
    right: 0
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var BrowserCaption = function BrowserCaption(_ref) {
  var theme = _ref.theme,
      onMore = _ref.onMore,
      onCheck = _ref.onCheck,
      onUnCheck = _ref.onUnCheck,
      caption = _ref.caption,
      children = _ref.children,
      onClose = _ref.onClose;

  var TS = theme.getStyle(TH_ID);
  return _react2.default.createElement(
    'div',
    { className: CL.ROOT, style: (0, _extends3.default)({}, S.ROOT, TS.ROOT) },
    _isFn(onMore) && _react2.default.createElement(_SvgMore2.default, {
      svgStyle: S.SVG_MORE,
      onClick: onMore
    }),
    _isFn(onCheck) && _isFn(onUnCheck) && _react2.default.createElement(_SvgCheckBox2.default, {
      style: S.CHECK_BOX,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }),
    _react2.default.createElement(
      'span',
      {
        className: CL.NOT_SELECTED,
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
  onMore: PropTypes.func,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  caption: PropTypes.string,
  onClose: PropTypes.func
}
*/

exports.default = (0, _withTheme2.default)(BrowserCaption);
//# sourceMappingURL=BrowserCaption.js.map