'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WithLogicDnD = {
    dragDropItem: function dragDropItem(watchList, _ref) {
        var dragId = _ref.dragId,
            dropId = _ref.dropId;

        var dragArr = dragId.split(';'),
            dragGroup = _LogicFn2.default.findGroup(watchList, dragArr[0]),
            dragList = _LogicFn2.default.findList(dragGroup, dragArr[1]),
            dragIndex = _LogicFn2.default.findIndex(dragList.items, dragArr[2]),
            dragItem = dragList.items[dragIndex];

        var dropArr = dropId.split(';'),
            dropGroup = _LogicFn2.default.findGroup(watchList, dropArr[0]),
            dropList = _LogicFn2.default.findList(dropGroup, dropArr[1]),
            dropIndex = dropArr[2] ? _LogicFn2.default.findIndex(dropList.items, dropArr[2]) : 0;

        if (dragList.caption !== dropList.caption && _LogicFn2.default.checkIsInArraySameCaption(dropList.items, dragArr[3])) {
            return _LogicFn2.default.fDragDropItemExisted(dropArr[1], dragArr[2]);
        }

        dragList.items = _LogicFn2.default.filter(dragList.items, dragArr[2]);
        dropList.items = _LogicFn2.default.insertItemInArray(dragItem, dropIndex, dropList.items);

        return { isDone: true };
    },
    dragDropList: function dragDropList(watchList, _ref2) {
        var dragId = _ref2.dragId,
            dropId = _ref2.dropId;

        var _dragId$split = dragId.split(';'),
            _dragId$split2 = _slicedToArray(_dragId$split, 2),
            dragGroupCaption = _dragId$split2[0],
            dragListCaption = _dragId$split2[1],
            dragGroup = _LogicFn2.default.findGroup(watchList, dragGroupCaption),
            dragList = _LogicFn2.default.findList(dragGroup, dragListCaption);

        var _dropId$split = dropId.split(';'),
            _dropId$split2 = _slicedToArray(_dropId$split, 2),
            dropGroupCaption = _dropId$split2[0],
            dropListCaption = _dropId$split2[1],
            dropGroup = _LogicFn2.default.findGroup(watchList, dropGroupCaption),
            dropIndex = dropListCaption ? _LogicFn2.default.findIndex(dropGroup.lists, dropListCaption) : 0;

        if (dragGroup.caption !== dropGroup.caption && _LogicFn2.default.checkIsInArraySameCaption(dropGroup.lists, dragListCaption)) {
            return _LogicFn2.default.fDragDropListExisted(dropGroupCaption, dragListCaption);
        }

        dragGroup.lists = _LogicFn2.default.filter(dragGroup.lists, dragListCaption);
        dropGroup.lists = _LogicFn2.default.insertItemInArray(dragList, dropIndex, dropGroup.lists);

        return { isDone: true };
    },
    dragDropGroup: function dragDropGroup(watchList, _ref3) {
        var dragId = _ref3.dragId,
            dropId = _ref3.dropId;

        var _dragId$split3 = dragId.split(';'),
            _dragId$split4 = _slicedToArray(_dragId$split3, 1),
            dragGroupCaption = _dragId$split4[0],
            dragGroup = _LogicFn2.default.findGroup(watchList, dragGroupCaption),
            _dropId$split3 = dropId.split(';'),
            _dropId$split4 = _slicedToArray(_dropId$split3, 1),
            dropGroupCaption = _dropId$split4[0],
            dropIndex = dropGroupCaption ? _LogicFn2.default.findIndex(watchList.groups, dropGroupCaption) : 0;

        watchList.groups = _LogicFn2.default.filter(watchList.groups, dragGroupCaption);
        watchList.groups = _LogicFn2.default.insertItemInArray(dragGroup, dropIndex, watchList.groups);

        return { isDone: true };
    }
};

exports.default = WithLogicDnD;
//# sourceMappingURL=WithLogicDnD.js.map