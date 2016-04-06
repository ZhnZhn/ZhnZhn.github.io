'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _AppErc = require('./components/AppErc');

var _AppErc2 = _interopRequireDefault(_AppErc);

var _ChartConfigs = require('./constants/ChartConfigs');

var _ChartConfigs2 = _interopRequireDefault(_ChartConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_highcharts2.default.setOptions(_ChartConfigs2.default.theme);

(0, _reactDom.render)(_react2.default.createElement(_AppErc2.default, null), document.getElementById('app'));
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\index.js.map