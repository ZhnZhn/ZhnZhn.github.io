'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ClusterInfo = require('../map/ClusterInfo');

var _ClusterInfo2 = _interopRequireDefault(_ClusterInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapFactory = {
  crClusterInfo: function crClusterInfo(props) {
    return _react2.default.createElement(_ClusterInfo2.default, props);
  },
  crInfo: function crInfo(_ref) {
    var label = _ref.label,
        value = _ref.value;

    return _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'span',
        null,
        label,
        ':\xA0'
      ),
      _react2.default.createElement(
        'span',
        null,
        value ? value : 'unknown'
      )
    );
  }
};

exports.default = MapFactory;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\factories\MapFactory.js.map