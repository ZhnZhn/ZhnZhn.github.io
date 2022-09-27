"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _DnDListHandlers = require("./dnd-handlers/DnDListHandlers");

var _Comp = _interopRequireDefault(require("../Comp"));

var _WatchItems = _interopRequireDefault(require("./WatchItems"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  OpenClose2
} = _Comp.default,
      _isArr = Array.isArray,
      C_LIST_OPEN = '#80c040',
      S_LIST_DIV = {
  marginLeft: 8,
  paddingLeft: 2,
  borderLeftStyle: 'solid',
  borderLeftWidth: 2,
  borderLeftColor: 'inherit',
  lineHeight: 2
},
      S_MR_10 = {
  marginRight: 10
};

const WatchLists = _ref => {
  let {
    isModeEdit,
    groupCaption,
    lists
  } = _ref;
  return _isArr(lists) ? lists.map(_ref2 => {
    let {
      caption,
      items
    } = _ref2;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(OpenClose2, {
      style: S_LIST_DIV,
      notSelectedStyle: S_MR_10,
      openColor: C_LIST_OPEN,
      caption: caption,
      isDraggable: isModeEdit,
      option: {
        groupCaption,
        caption
      },
      onDragStart: _DnDListHandlers.hDragStartList,
      onDragEnter: _DnDListHandlers.hDragEnterList,
      onDragOver: _DnDListHandlers.hDragOverList,
      onDragLeave: _DnDListHandlers.hDragLeaveList,
      onDrop: _DnDListHandlers.hDropList,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WatchItems.default, {
        isModeEdit: isModeEdit,
        items: items,
        groupCaption: groupCaption,
        listCaption: caption
      })
    }, caption);
  }) : null;
};

var _default = WatchLists;
exports.default = _default;
//# sourceMappingURL=WatchLists.js.map