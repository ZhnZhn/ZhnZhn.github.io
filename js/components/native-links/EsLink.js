'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = "native-link";
var URL = 'http://appsso.eurostat.ec.europa.eu/nui/show.do?lang=en&dataset=';

var S = {
  ROOT: {
    listStyle: 'none'
  }
};

var EsLink = function EsLink(_ref) {
  var item = _ref.item;

  if (!item) {
    return null;
  }
  return _react2.default.createElement(
    'ul',
    { style: S.ROOT },
    item.href && _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_Link2.default, {
        className: CL,
        caption: 'Eurostat Raw Data Link',
        href: item.href
      })
    ),
    item.dataset && _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_Link2.default, {
        className: CL,
        caption: 'Eurostat Dataset Viewer (Http)',
        href: '' + URL + item.dataset
      })
    )
  );
};

exports.default = EsLink;
//# sourceMappingURL=EsLink.js.map