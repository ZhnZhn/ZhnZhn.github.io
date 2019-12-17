"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var fnDnD = {
  setTransferTo: function setTransferTo(_ref) {
    var event = _ref.event,
        dragId = _ref.dragId,
        xType = _ref.xType;
    Object.assign(event.dataTransfer, {
      effectAllowed: "move",
      dropEffect: "move"
    }).setData("text", JSON.stringify({
      dragId: dragId,
      xType: xType
    }));
  }
};
var _default = fnDnD;
exports["default"] = _default;
//# sourceMappingURL=fnDnD.js.map