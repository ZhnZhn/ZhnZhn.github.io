'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _AppErc = require('./components/AppErc');

var _AppErc2 = _interopRequireDefault(_AppErc);

var _ChartConfig = require('./charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ChartConfig2.default.init();

var _fnRemoveSpinner = function _fnRemoveSpinner() {
  document.body.removeChild(document.getElementById('spinner'));
};

(0, _reactDom.render)(_react2.default.createElement(_AppErc2.default, null), document.getElementById('app'), _fnRemoveSpinner);
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\index.js.map