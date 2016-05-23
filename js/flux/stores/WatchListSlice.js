'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

var _ComponentActions = require('../actions/ComponentActions');

var _WatchDefault = require('../../constants/WatchDefault');

var _WatchDefault2 = _interopRequireDefault(_WatchDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = 'watchList';

var WatchListSlice = {
  watchList: _WatchDefault2.default,
  //watchList : null,
  initWatchList: function initWatchList() {
    var _this = this;

    _localforage2.default.getItem(key).then(function (value) {
      _this.watchList = value ? value : _WatchDefault2.default;
      _this.trigger(_ComponentActions.ComponentActionTypes.UPDATE_WATCH_BROWSER, _this.watchList);
    }).catch(function () {
      _this.watchList = _WatchDefault2.default;
      _this.trigger(_ComponentActions.ComponentActionTypes.UPDATE_WATCH_BROWSER, _this.watchList);
    });
  },
  getWatchList: function getWatchList() {
    return this.watchList;
  },
  getWatchGroups: function getWatchGroups() {
    return this.watchList.groups;
  },
  onAddItem: function onAddItem(item) {
    var caption = item.caption;
    var config = item.config;
    var zhConfig = config.zhConfig;
    var dataColumn = zhConfig.dataColumn;
    var id = zhConfig.id;

    var toGroup = this.watchList.groups.find(function (group, index) {
      return group.caption === item.groupCaption;
    });
    var toList = toGroup.lists.find(function (list, index) {
      return list.caption === item.listCaption;
    });
    if (toList.items) {
      toList.items.push({ caption: caption, dataColumn: dataColumn, id: id });
    } else {
      toList.items = [{ caption: caption, dataColumn: dataColumn, id: id }];
    }

    this.trigger(_ComponentActions.ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
  },
  onRemoveItem: function onRemoveItem(_ref) {
    var groupCaption = _ref.groupCaption;
    var listCaption = _ref.listCaption;
    var caption = _ref.caption;

    var groupFrom = this.watchList.groups.find(function (group, index) {
      return group.caption === groupCaption;
    });
    var listFrom = groupFrom.lists.find(function (list, index) {
      return list.caption === listCaption;
    });
    listFrom.items = listFrom.items.filter(function (item, index) {
      return item.caption !== caption;
    });

    this.trigger(_ComponentActions.ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
  },
  onSaveWatch: function onSaveWatch() {
    _localforage2.default.setItem(key, this.watchList).then(function () {
      console.log('watchList has been saved');
    });
  }
};

exports.default = WatchListSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\WatchListSlice.js.map