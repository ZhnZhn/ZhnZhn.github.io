'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _AppErc = require('../AppErc');

var _AppErc2 = _interopRequireDefault(_AppErc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AppErc', function () {
  test.skip('should render without crashing', function () {
    var divNode = document.createElement('div');
    _reactDom2.default.render(_react2.default.createElement(_AppErc2.default, null), divNode);
    _reactDom2.default.unmountComponentAtNode(divNode);
  });
});
//# sourceMappingURL=AppErc.test.js.map