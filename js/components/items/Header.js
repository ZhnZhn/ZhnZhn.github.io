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

var _SvgCheckBox = require('../zhn/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ValueMovingBadge = require('./ValueMovingBadge');

var _ValueMovingBadge2 = _interopRequireDefault(_ValueMovingBadge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import PropTypes from "prop-types";

var TH_ID = 'ELEMENT';
var CL = 'not-selected shadow-right';

var S = {
  ROOT: {
    backgroundColor: '#1b2836',
    paddingTop: '4px',
    paddingRight: '42px',
    height: 'auto',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  CHECK_BOX: {
    //float: 'left',
    marginRight: '10px',
    marginLeft: '10px'
  },
  CAPTION_OPEN: {
    textAlign: 'left',
    display: 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '125px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: 'hidden'

  },
  CAPTION_CLOSE: {
    color: 'gray'
  },
  CAPTION_WIDTH: {
    textAlign: 'left',
    width: '280px'
  },
  TIME: {
    color: 'rgb(253, 179, 22)',
    fontWeight: 'bold',
    paddingLeft: '16px'
  },
  CLOSE: {
    position: 'absolute',
    right: 0,
    top: '4px'
  }
};

var Header = function Header(props) {
  var theme = props.theme,
      isOpen = props.isOpen,
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
      TS = theme.getStyle(TH_ID),
      _styleIsOpen = isOpen ? S.CAPTION_OPEN : (0, _extends3.default)({}, S.CAPTION_OPEN, S.CAPTION_CLOSE),
      _styleCaption = valueMoving ? _styleIsOpen : (0, _extends3.default)({}, _styleIsOpen, S.CAPTION_WIDTH),
      _movingBadgeEl = valueMoving ? _react2.default.createElement(_ValueMovingBadge2.default, {
    valueMoving: valueMoving,
    isAdminMode: isAdminMode,
    crValueMoving: crValueMoving
  }) : null,
      _timeEl = !valueMoving && itemTime ? _react2.default.createElement(
    'span',
    { style: S.TIME },
    itemTime
  ) : null;

  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, S.ROOT, TS.ROOT) },
    _react2.default.createElement(_SvgCheckBox2.default, {
      rootStyle: S.CHECK_BOX,
      chartType: chartType,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }),
    _react2.default.createElement(
      'button',
      {
        className: CL,
        title: itemTitle,
        style: _styleCaption,
        onClick: onToggle
      },
      itemCaption
    ),
    _movingBadgeEl,
    _timeEl,
    _react2.default.createElement(_SvgClose2.default, {
      style: S.CLOSE,
      onClose: onClose
    })
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

exports.default = (0, _withTheme2.default)(Header);
//# sourceMappingURL=Header.js.map