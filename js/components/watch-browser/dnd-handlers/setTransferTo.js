"use strict";

exports.__esModule = true;
exports.default = void 0;
const _assign = Object.assign;

const setTransferTo = _ref => {
  let {
    event,
    dragId,
    xType
  } = _ref;

  _assign(event.dataTransfer, {
    effectAllowed: "move",
    dropEffect: "move"
  }).setData("text", JSON.stringify({
    dragId,
    xType
  }));
};

var _default = setTransferTo;
exports.default = _default;
//# sourceMappingURL=setTransferTo.js.map