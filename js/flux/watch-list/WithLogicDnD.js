'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crAlertItemExisted = _LogicFn2.default.crAlertItemExisted,
    crAlertListExisted = _LogicFn2.default.crAlertListExisted,
    findGroup = _LogicFn2.default.findGroup,
    findList = _LogicFn2.default.findList,
    findIndex = _LogicFn2.default.findIndex,
    isInArraySameCaption = _LogicFn2.default.isInArraySameCaption,
    filter = _LogicFn2.default.filter,
    insertItemInArray = _LogicFn2.default.insertItemInArray;


var WithLogicDnD = {
    dragDropItem: function dragDropItem(watchList, _ref) {
        var dragId = _ref.dragId,
            dropId = _ref.dropId;

        var dragArr = dragId.split(';'),
            dragGroup = findGroup(watchList, dragArr[0]),
            dragList = findList(dragGroup, dragArr[1]),
            dragIndex = findIndex(dragList.items, dragArr[2]),
            dragItem = dragList.items[dragIndex];

        var dropArr = dropId.split(';'),
            dropGroup = findGroup(watchList, dropArr[0]),
            dropList = findList(dropGroup, dropArr[1]),
            dropIndex = dropArr[2] ? findIndex(dropList.items, dropArr[2]) : 0;

        //dragArr[3] => dragArr[2]
        if (dragList.caption !== dropList.caption && isInArraySameCaption(dropList.items, dragArr[2])) {
            return crAlertItemExisted(dropArr[1], dragArr[2]);
        }

        dragList.items = filter(dragList.items, dragArr[2]);
        dropList.items = insertItemInArray(dragItem, dropIndex, dropList.items);

        return { isDone: true };
    },
    dragDropList: function dragDropList(watchList, _ref2) {
        var dragId = _ref2.dragId,
            dropId = _ref2.dropId;

        var _dragId$split = dragId.split(';'),
            _dragId$split2 = (0, _slicedToArray3.default)(_dragId$split, 2),
            dragGroupCaption = _dragId$split2[0],
            dragListCaption = _dragId$split2[1],
            dragGroup = findGroup(watchList, dragGroupCaption),
            dragList = findList(dragGroup, dragListCaption);

        var _dropId$split = dropId.split(';'),
            _dropId$split2 = (0, _slicedToArray3.default)(_dropId$split, 2),
            dropGroupCaption = _dropId$split2[0],
            dropListCaption = _dropId$split2[1],
            dropGroup = findGroup(watchList, dropGroupCaption),
            dropIndex = dropListCaption ? findIndex(dropGroup.lists, dropListCaption) : 0;

        if (dragGroup.caption !== dropGroup.caption && isInArraySameCaption(dropGroup.lists, dragListCaption)) {
            return crAlertListExisted(dropGroupCaption, dragListCaption);
        }

        dragGroup.lists = filter(dragGroup.lists, dragListCaption);
        dropGroup.lists = insertItemInArray(dragList, dropIndex, dropGroup.lists);

        return { isDone: true };
    },
    dragDropGroup: function dragDropGroup(watchList, _ref3) {
        var dragId = _ref3.dragId,
            dropId = _ref3.dropId;

        var _dragId$split3 = dragId.split(';'),
            _dragId$split4 = (0, _slicedToArray3.default)(_dragId$split3, 1),
            dragGroupCaption = _dragId$split4[0],
            dragGroup = findGroup(watchList, dragGroupCaption),
            _dropId$split3 = dropId.split(';'),
            _dropId$split4 = (0, _slicedToArray3.default)(_dropId$split3, 1),
            dropGroupCaption = _dropId$split4[0],
            dropIndex = dropGroupCaption ? findIndex(watchList.groups, dropGroupCaption) : 0;

        watchList.groups = filter(watchList.groups, dragGroupCaption);
        watchList.groups = insertItemInArray(dragGroup, dropIndex, watchList.groups);

        return { isDone: true };
    }
};

exports.default = WithLogicDnD;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\watch-list\WithLogicDnD.js.map