'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SvgCheckBox = require('../zhn/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ValueMovingBadge = require('./ValueMovingBadge');

var _ValueMovingBadge2 = _interopRequireDefault(_ValueMovingBadge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    backgroundColor: '#1b2836',
    paddingTop: '4px',
    lineHeight: 1.8,
    height: '32px',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  CHECK_BOX: {
    float: 'left',
    marginRight: '10px',
    marginLeft: '10px'
  },
  CAPTION_OPEN: {
    display: 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '125px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    float: 'left'
  },
  CAPTION_CLOSE: {
    color: 'gray'
  },
  CAPTION_WIDTH: {
    width: '385px'
  },
  TIME: {
    color: 'rgb(253, 179, 22)',
    fontWeight: 'bold',
    paddingLeft: '16px'
  }
};

var Header = function Header(props) {
  var isOpen = props.isOpen,
      chartType = props.chartType,
      onCheck = props.onCheck,
      onUnCheck = props.onUnCheck,
      itemCaption = props.itemCaption,
      itemTitle = props.itemTitle,
      itemTime = props.itemTime,
      onToggle = props.onToggle,
      valueMoving = props.valueMoving,
      isAdminMode = props.isAdminMode,
      crValueMoving = props.crValueMoving,
      onClose = props.onClose,
      _styleIsOpen = isOpen ? STYLE.CAPTION_OPEN : Object.assign({}, STYLE.CAPTION_OPEN, STYLE.CAPTION_CLOSE),
      _styleCaption = valueMoving ? _styleIsOpen : Object.assign({}, _styleIsOpen, STYLE.CAPTION_WIDTH),
      _movingBadgeEl = valueMoving ? _react2.default.createElement(_ValueMovingBadge2.default, {
    valueMoving: valueMoving,
    isAdminMode: isAdminMode,
    crValueMoving: crValueMoving
  }) : undefined,
      _timeEl = !valueMoving && itemTime ? _react2.default.createElement(
    'span',
    { style: STYLE.TIME },
    itemTime
  ) : undefined;

  return _react2.default.createElement(
    'div',
    { style: STYLE.ROOT },
    _react2.default.createElement(_SvgCheckBox2.default, {
      rootStyle: STYLE.CHECK_BOX,
      chartType: chartType,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }),
    _react2.default.createElement(
      'span',
      {
        className: 'not-selected',
        title: itemTitle,
        style: _styleCaption,
        onClick: onToggle
      },
      itemCaption
    ),
    _movingBadgeEl,
    _timeEl,
    _react2.default.createElement(_SvgClose2.default, { onClose: onClose })
  );
};

Header.propTypes = process.env.NODE_ENV !== "production" ? {
  isOpen: _propTypes2.default.bool.isRequired,
  chartType: _propTypes2.default.string.isRequired,
  onCheck: _propTypes2.default.func.isRequired,
  onUnCheck: _propTypes2.default.func.isRequired,
  itemCaption: _propTypes2.default.string.isRequired,
  itemTitle: _propTypes2.default.string.isRequired,
  itemTime: _propTypes2.default.string,
  onToggle: _propTypes2.default.func.isRequired,
  valueMoving: _propTypes2.default.object,
  isAdminMode: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.bool]),
  crValueMoving: _propTypes2.default.func,
  onClose: _propTypes2.default.func.isRequired
} : {};

exports.default = Header;
//# sourceMappingURL=Header.js.map