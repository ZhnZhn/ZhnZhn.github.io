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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'ELEMENT';
//import PropTypes from "prop-types";

var S = {
  LI: {
    float: 'left',
    display: 'inline-block',
    backgroundColor: '#1b2836',
    color: 'gray',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '6px',
    paddingBottom: '6px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    cursor: 'pointer',

    fontWeight: 'bold',
    border: '2px solid gray',
    borderBottom: 'none'

  },
  SELECTED: {
    borderColor: 'rgba(164, 135, 212, 1)',
    color: 'rgba(164, 135, 212, 1)'
  }
};

var Tab = function Tab(_ref) {
  var theme = _ref.theme,
      title = _ref.title,
      isSelected = _ref.isSelected,
      onClick = _ref.onClick;

  var TS = theme.getStyle(TH_ID);
  var _selectedStyle = isSelected ? S.SELECTED : null;
  return _react2.default.createElement(
    'li',
    {
      style: (0, _extends3.default)({}, S.LI, TS.BG, _selectedStyle),
      onClick: onClick
    },
    _react2.default.createElement(
      'span',
      null,
      title
    )
  );
};

/*
Tab.propTypes = {
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
}
*/

exports.default = (0, _withTheme2.default)(Tab);
//# sourceMappingURL=Tab.js.map