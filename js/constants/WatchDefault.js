"use strict";

exports.__esModule = true;
exports.default = void 0;

const GROUP_CAPTIONS = ['Economic Metrics', 'Currencies', 'Commodities', 'Stocks', 'Indexes', 'Futures'],
      _crGroup = caption => ({
  caption,
  lists: [{
    caption: 'List1'
  }, {
    caption: 'List2'
  }, {
    caption: 'List3'
  }]
});

const WatchDefault = {
  groups: GROUP_CAPTIONS.map(_crGroup)
};
var _default = WatchDefault;
exports.default = _default;
//# sourceMappingURL=WatchDefault.js.map