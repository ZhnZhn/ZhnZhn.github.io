'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var WatchListSlice = {
  watchList: {
    groups: [{
      title: 'Economic Metrics',
      lists: [{
        title: 'List1'
      }]
    }, { title: 'Commodities' }, { title: 'Stocks' }, { title: 'Indexes' }]
  },
  getWatchList: function getWatchList() {
    return this.watchList;
  }
};

exports.default = WatchListSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\WatchListSlice.js.map