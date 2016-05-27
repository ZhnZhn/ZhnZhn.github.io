'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var WatchDefault = {
  groups: [{
    caption: 'Economic Metrics',
    lists: [{ caption: 'List1' }, { caption: 'List2' }, { caption: 'List3' }]
  }, {
    caption: 'Currencies',
    lists: [{ caption: 'List1' }, { caption: 'List2' }, { caption: 'List3' }]
  }, {
    caption: 'Commodities',
    lists: [{ caption: 'List1' }, { caption: 'List2' }, { caption: 'List3' }]
  }, {
    caption: 'Stocks',
    lists: [{ caption: 'List1' }, { caption: 'List2' }, { caption: 'List3' }]
  }, {
    caption: 'Indexes',
    lists: [{ caption: 'List1' }, { caption: 'List2' }, { caption: 'List3' }]
  }, {
    caption: 'Futures',
    lists: [{ caption: 'List1' }, { caption: 'List2' }, { caption: 'List3' }]
  }]
};

WatchDefault.fDefaultGroup = function (_ref) {
  var _ref$caption = _ref.caption;
  var caption = _ref$caption === undefined ? 'Default' : _ref$caption;

  return { caption: caption };
};

exports.default = WatchDefault;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\WatchDefault.js.map