'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

var _ComponentActions = require('../actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _BrowserActions = require('../actions/BrowserActions');

var _WatchActions = require('../actions/WatchActions');

var _WatchDefault = require('../../constants/WatchDefault');

var _WatchDefault2 = _interopRequireDefault(_WatchDefault);

var _Type = require('../../constants/Type');

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var STORAGE_KEY = 'watchList';

var _fnOpenInfoDialog = function _fnOpenInfoDialog(descr) {
  _ComponentActions2.default.showModalDialog(_Type.ModalDialog.INFO, {
    caption: 'Watch List:',
    descr: descr
  });
};

var _fResultNotFound = function _fResultNotFound(itemType, name) {
  return { isDone: false, message: _Msg2.default.NOT_FOUND_ITEM(itemType, name) };
};
var _fResultGroupExisted = function _fResultGroupExisted(caption) {
  return { isDone: false, message: _Msg2.default.GROUP_EXISTED(caption) };
};
var _fResultListExisted = function _fResultListExisted(captionList, captionGroup) {
  return { isDone: false, message: _Msg2.default.LIST_EXISTED(captionList, captionGroup) };
};
var _fResultItemExisted = function _fResultItemExisted(caption, captionList) {
  return { isDone: false, message: _Msg2.default.ITEM_EXISTED(caption, captionList) };
};

var _fnFilter = function _fnFilter(arr, caption) {
  return arr.filter(function (obj, index) {
    return obj.caption !== caption;
  });
};

var _fnFindIndex = function _fnFindIndex(arr, caption) {
  return arr.findIndex(function (item, index) {
    return item.caption === caption;
  });
};

var _fnGetArrayWithObj = function _fnGetArrayWithObj(arr, obj) {
  return arr ? [].concat(_toConsumableArray(arr), [obj]) : [obj];
};
var _fnGetArrayWithRename = function _fnGetArrayWithRename(arr, index, caption) {
  return [].concat(_toConsumableArray(arr.slice(0, index)), [Object.assign({}, arr[index], { caption: caption })], _toConsumableArray(arr.slice(index + 1)));
};

var _fnCheckIsInArraySameCaption = function _fnCheckIsInArraySameCaption(arr, caption) {
  var index = arr ? arr.findIndex(function (item, i) {
    return item.caption === caption;
  }) : -1;
  if (index === -1) {
    return false;
  } else {
    return true;
  }
};

var _fnFindGroup = function _fnFindGroup(watchList, captionGroup) {
  return watchList.groups.find(function (group, index) {
    return group.caption === captionGroup;
  });
};

var _fnFindList = function _fnFindList(group, captionList) {
  return group.lists.find(function (list, index) {
    return list.caption === captionList;
  });
};

var _fnAddItem = function _fnAddItem(watchList, item) {
  var caption = item.caption;
  var groupCaption = item.groupCaption;
  var listCaption = item.listCaption;
  var config = item.config;
  var zhConfig = config.zhConfig;
  var title = zhConfig.title;
  var columnName = zhConfig.columnName;
  var dataColumn = zhConfig.dataColumn;
  var id = zhConfig.id;
  var fromDate = zhConfig.fromDate;
  var seriaColumnNames = zhConfig.seriaColumnNames;
  var toGroup = _fnFindGroup(watchList, groupCaption);
  var toList = _fnFindList(toGroup, listCaption);
  var items = toList.items;

  if (_fnCheckIsInArraySameCaption(items, caption)) {
    return _fResultItemExisted(caption, listCaption);
  }
  if (items) {
    toList.items.push({
      title: title, caption: caption, columnName: columnName, dataColumn: dataColumn, id: id, fromDate: fromDate, seriaColumnNames: seriaColumnNames
    });
  } else {
    toList.items = [{
      title: title, caption: caption, columnName: columnName, dataColumn: dataColumn, id: id, fromDate: fromDate, seriaColumnNames: seriaColumnNames
    }];
  }
  return { isDone: true };
};
var _fnRemoveItem = function _fnRemoveItem(watchList, _ref) {
  var groupCaption = _ref.groupCaption;
  var listCaption = _ref.listCaption;
  var caption = _ref.caption;

  var groupFrom = _fnFindGroup(watchList, groupCaption),
      listFrom = _fnFindList(groupFrom, listCaption);
  listFrom.items = _fnFilter(listFrom.items, caption);
};

var _fnAddGroup = function _fnAddGroup(watchList, _ref2) {
  var caption = _ref2.caption;

  var groups = watchList.groups;
  if (_fnCheckIsInArraySameCaption(groups, caption)) {
    return _fResultGroupExisted(caption);
  }
  watchList.groups = _fnGetArrayWithObj(groups, _WatchDefault2.default.fDefaultGroup({ caption: caption }));
  return { isDone: true };
};
var _fnRenameGroup = function _fnRenameGroup(watchList, _ref3) {
  var captionFrom = _ref3.captionFrom;
  var captionTo = _ref3.captionTo;

  var groups = watchList.groups;
  var groupIndex = _fnFindIndex(groups, captionFrom);
  if (groupIndex === -1) {
    return _fResultNotFound('group', captionFrom);
  }
  if (_fnCheckIsInArraySameCaption(groups, captionTo)) {
    return _fResultGroupExisted(captionTo);
  }
  watchList.groups = _fnGetArrayWithRename(groups, groupIndex, captionTo);
  return { isDone: true };
};
var _fnDeleteGroup = function _fnDeleteGroup(watchList, _ref4) {
  var caption = _ref4.caption;

  watchList.groups = _fnFilter(watchList.groups, caption);
  return { isDone: true };
};

var _fnCreateList = function _fnCreateList(watchList, _ref5) {
  var captionGroup = _ref5.captionGroup;
  var captionList = _ref5.captionList;

  var groupTo = _fnFindGroup(watchList, captionGroup);
  if (!groupTo) {
    return _fResultNotFound('group', captionGroup);
  }
  var lists = groupTo.lists;
  if (_fnCheckIsInArraySameCaption(lists, captionList)) {
    return _fResultListExisted(captionList, captionGroup);
  }
  groupTo.lists = _fnGetArrayWithObj(lists, { caption: captionList });
  return { isDone: true };
};

var _fnRenameList = function _fnRenameList(watchList, _ref6) {
  var captionGroup = _ref6.captionGroup;
  var captionListFrom = _ref6.captionListFrom;
  var captionListTo = _ref6.captionListTo;

  var groupIn = _fnFindGroup(watchList, captionGroup);
  if (!groupIn) {
    return _fResultNotFound('group', captionGroup);
  }
  var lists = groupIn.lists;
  var listIndex = _fnFindIndex(lists, captionListFrom);
  if (listIndex === -1) {
    return _fResultNotFound('list', captionListFrom);
  }
  if (_fnCheckIsInArraySameCaption(lists, captionListTo)) {
    return _fResultListExisted(captionListTo, captionGroup);
  }
  groupIn.lists = _fnGetArrayWithRename(lists, listIndex, captionListTo);
  return { isDone: true };
};

var _fnDeleteList = function _fnDeleteList(watchList, _ref7) {
  var captionGroup = _ref7.captionGroup;
  var captionList = _ref7.captionList;

  var groupFrom = _fnFindGroup(watchList, captionGroup);
  if (!groupFrom) {
    return _fResultNotFound('group', captionGroup);
  }
  groupFrom.lists = _fnFilter(groupFrom.lists, captionList);
  return { isDone: true };
};

var WatchListSlice = {
  watchList: _WatchDefault2.default,
  isWatchEdited: false,
  //watchList : null,
  initWatchList: function initWatchList() {
    var _this = this;

    _localforage2.default.getItem(STORAGE_KEY).then(function (value) {
      _this.watchList = value ? value : _WatchDefault2.default;
      _this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER, _this.watchList);
    }).catch(function () {
      _this.watchList = _WatchDefault2.default;
      _this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER, _this.watchList);
    });
  },
  getWatchList: function getWatchList() {
    return this.watchList;
  },
  getWatchGroups: function getWatchGroups() {
    return this.watchList.groups;
  },
  getWatchListsByGroup: function getWatchListsByGroup(groupCaption) {
    var group = _fnFindGroup(this.watchList, groupCaption);
    if (!group) {
      return [];
    }
    return group.lists;
  },
  onAddItem: function onAddItem(item) {
    this._onEditWatch(_fnAddItem(this.watchList, item), _WatchActions.WatchActionTypes.ADD_ITEM);
  },
  onRemoveItem: function onRemoveItem(option) {
    _fnRemoveItem(this.watchList, option);
    this.isWatchEdited = true;
    this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
  },
  onSaveWatch: function onSaveWatch() {
    var _this2 = this;

    if (this.isWatchEdited) {
      _localforage2.default.setItem(STORAGE_KEY, this.watchList).then(function () {
        _this2.isWatchEdited = false;
        _fnOpenInfoDialog(_Msg2.default.WATCH_SAVED);
        console.log(_Msg2.default.WATCH_SAVED);
      });
    } else {
      _fnOpenInfoDialog(_Msg2.default.WATCH_PREV);
    }
  },
  _onEditWatch: function _onEditWatch(result, forActionType) {
    if (result.isDone) {
      this.isWatchEdited = true;
      this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
      this.trigger(_WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED, { forActionType: forActionType });
    } else {
      this.trigger(_WatchActions.WatchActionTypes.EDIT_WATCH_FAILED, {
        messages: [result.message],
        forActionType: forActionType
      });
    }
  },
  onAddGroup: function onAddGroup(option) {
    this._onEditWatch(_fnAddGroup(this.watchList, option), _WatchActions.WatchActionTypes.ADD_GROUP);
  },
  onRenameGroup: function onRenameGroup(option) {
    this._onEditWatch(_fnRenameGroup(this.watchList, option), _WatchActions.WatchActionTypes.RENAME_GROUP);
  },
  onDeleteGroup: function onDeleteGroup(option) {
    this._onEditWatch(_fnDeleteGroup(this.watchList, option), _WatchActions.WatchActionTypes.DELETE_GROUP);
  },
  onCreateList: function onCreateList(option) {
    this._onEditWatch(_fnCreateList(this.watchList, option), _WatchActions.WatchActionTypes.CREATE_LIST);
  },
  onRenameList: function onRenameList(option) {
    this._onEditWatch(_fnRenameList(this.watchList, option), _WatchActions.WatchActionTypes.RENAME_LIST);
  },
  onDeleteList: function onDeleteList(option) {
    this._onEditWatch(_fnDeleteList(this.watchList, option), _WatchActions.WatchActionTypes.DELETE_LIST);
  }
};

exports.default = WatchListSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\WatchListSlice.js.map