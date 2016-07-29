'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconQuandl = require('./IconQuandl');

var _IconQuandl2 = _interopRequireDefault(_IconQuandl);

var _IconGitHub = require('./IconGitHub');

var _IconGitHub2 = _interopRequireDefault(_IconGitHub);

var _IconReact = require('./IconReact');

var _IconReact2 = _interopRequireDefault(_IconReact);

var _IconHighcharts = require('./IconHighcharts');

var _IconHighcharts2 = _interopRequireDefault(_IconHighcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT: {
    textAlign: 'center',
    paddingTop: '20px'
  }
};

var IconLogoBar = function IconLogoBar(props) {
  return _react2.default.createElement(
    'div',
    { style: STYLE.ROOT },
    _react2.default.createElement(_IconQuandl2.default, null),
    _react2.default.createElement(_IconGitHub2.default, null),
    _react2.default.createElement(_IconReact2.default, null),
    _react2.default.createElement(_IconHighcharts2.default, null)
  );
};

exports.default = IconLogoBar;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\about\IconLogoBar.js.map