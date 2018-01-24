'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
//import PropTypes from "prop-types";

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

/*
Header.propTypes = {
  isOpen : PropTypes.bool.isRequired,
  chartType : PropTypes.string.isRequired,
  onCheck : PropTypes.func.isRequired,
  onUnCheck : PropTypes.func.isRequired,
  itemCaption : PropTypes.string.isRequired,
  itemTitle : PropTypes.string.isRequired,
  itemTime : PropTypes.string,
  onToggle : PropTypes.func.isRequired,
  valueMoving : PropTypes.object,
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  crValueMoving: PropTypes.func,
  onClose : PropTypes.func.isRequired
}
*/

exports.default = Header;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\Header.js.map