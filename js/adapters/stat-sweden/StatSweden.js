'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiTable = require('./ApiTable');

var _ApiTable2 = _interopRequireDefault(_ApiTable);

var _StatNorwayAdapter = require('../stat-norway/StatNorwayAdapter');

var _StatNorwayAdapter2 = _interopRequireDefault(_StatNorwayAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatSweden = {
  Table: {
    api: _ApiTable2.default,
    optionFetch: _ApiTable2.default.crOptionFetch,
    adapter: _StatNorwayAdapter2.default
  }
};

exports.default = StatSweden;
//# sourceMappingURL=StatSweden.js.map