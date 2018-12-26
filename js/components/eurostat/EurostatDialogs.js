'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DialogEurostat = require('./DialogEurostat');

var _DialogEurostat2 = _interopRequireDefault(_DialogEurostat);

var _DialogEurostat3 = require('./DialogEurostat2');

var _DialogEurostat4 = _interopRequireDefault(_DialogEurostat3);

var _DialogEurostat5 = require('./DialogEurostat3');

var _DialogEurostat6 = _interopRequireDefault(_DialogEurostat5);

var _DialogEurostat3A = require('./DialogEurostat3A');

var _DialogEurostat3A2 = _interopRequireDefault(_DialogEurostat3A);

var _DialogSelectN = require('./DialogSelectN');

var _DialogSelectN2 = _interopRequireDefault(_DialogSelectN);

var _DialogStatN = require('./DialogStatN');

var _DialogStatN2 = _interopRequireDefault(_DialogStatN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EurostatDialogs = {
  Eurostat: _DialogEurostat2.default, Eurostat2: _DialogEurostat4.default, Eurostat3: _DialogEurostat6.default,
  Eurostat3A: _DialogEurostat3A2.default,
  SelectN: _DialogSelectN2.default,
  StatN: _DialogStatN2.default
};

exports.default = EurostatDialogs;
//# sourceMappingURL=EurostatDialogs.js.map