'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    position: 'absolute',
    zIndex: 10,
    top: '25px',
    left: '0px',

    width: '150px',

    backgroundColor: 'rgb(77, 77, 77)',
    //border : '2px solid rgb(35, 47, 59)',
    border: '2px solid #1b2836',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    padding: '10px',
    paddingTop: '5px',
    paddingBottom: '12px',
    cursor: 'auto'
  }
};

var SubPanel = function SubPanel(_ref) {
  var style = _ref.style,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, STYLE.ROOT, style) },
    children
  );
};

SubPanel.propTypes = process.env.NODE_ENV !== "production" ? {
  style: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])
} : {};

exports.default = SubPanel;
//# sourceMappingURL=SubPanel.js.map