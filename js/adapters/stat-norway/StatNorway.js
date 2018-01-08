'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiDataset = require('./ApiDataset');

var _ApiDataset2 = _interopRequireDefault(_ApiDataset);

var _ApiTable = require('./ApiTable');

var _ApiTable2 = _interopRequireDefault(_ApiTable);

var _StatNorwayAdapter = require('./StatNorwayAdapter');

var _StatNorwayAdapter2 = _interopRequireDefault(_StatNorwayAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatNorway = {
  Dataset: { api: _ApiDataset2.default, adapter: _StatNorwayAdapter2.default },
  Table: {
    api: _ApiTable2.default,
    optionFetch: _ApiTable2.default.crOptionFetch,
    adapter: _StatNorwayAdapter2.default
  }
};

exports.default = StatNorway;
//# sourceMappingURL=StatNorway.js.map