'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _highchartsMore = require('highcharts/lib/highcharts-more');

var _highchartsMore2 = _interopRequireDefault(_highchartsMore);

var _treemap = require('highcharts/lib/modules/treemap');

var _treemap2 = _interopRequireDefault(_treemap);

var _AppErc = require('./components/AppErc');

var _AppErc2 = _interopRequireDefault(_AppErc);

var _ChartConfig = require('./charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _highchartsMore2.default)(_highcharts2.default);
(0, _treemap2.default)(_highcharts2.default);
_highcharts2.default.setOptions(_ChartConfig2.default.theme);

_highcharts2.default.wrap(_highcharts2.default.Chart.prototype, 'showCredits', function (next, credits) {
  next.call(this, credits);
  if (credits.enabled) {
    this.credits.element.onclick = function () {
      var link = document.createElement('a');
      link.rel = "noopener noreferrer";
      link.target = credits.targer;
      link.href = credits.href;
      link.click();
    };
  }
});

var _fnRemoveSpinner = function _fnRemoveSpinner() {
  document.body.removeChild(document.getElementById('spinner'));
};

(0, _reactDom.render)(_react2.default.createElement(_AppErc2.default, null), document.getElementById('app'), _fnRemoveSpinner);
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\index.js.map