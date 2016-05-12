'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgHrzResize = require('./zhn/SvgHrzResize');

var _SvgHrzResize2 = _interopRequireDefault(_SvgHrzResize);

var _SvgClose = require('./SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  captionDiv: {
    backgroundColor: '#232F3B',
    color: 'rgba(164, 135, 212, 1)',
    height: '28px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    marginRight: '5px',
    marginBottom: '10px'
  },
  captionSpan: {
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  }
};

var CaptionRow = _react2.default.createClass({
  displayName: 'CaptionRow',

  render: function render() {
    var _props = this.props;
    var isResizable = _props.isResizable;
    var initWidth = _props.initWidth;
    var minWidth = _props.minWidth;
    var maxWidth = _props.maxWidth;
    var comp = _props.comp;
    var onResizeAfter = _props.onResizeAfter;

    var _compHrzResize = isResizable ? _react2.default.createElement(_SvgHrzResize2.default, {
      initWidth: initWidth,
      minWidth: minWidth,
      maxWidth: maxWidth,
      comp: comp,
      onResizeAfter: onResizeAfter
    }) : undefined;

    return _react2.default.createElement(
      'div',
      { style: styles.captionDiv },
      _react2.default.createElement(
        'span',
        { style: styles.captionSpan },
        this.props.caption
      ),
      _compHrzResize,
      _react2.default.createElement(_SvgClose2.default, { onClose: this.props.onClose })
    );
  }
});

exports.default = CaptionRow;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\CaptionRow.js.map