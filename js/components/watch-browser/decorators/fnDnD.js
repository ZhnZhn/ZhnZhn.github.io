"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fnDnD = {
  setTransferTo: function setTransferTo(_ref) {
    var event = _ref.event,
        dragId = _ref.dragId,
        xType = _ref.xType;

    Object.assign(event.dataTransfer, {
      effectAllowed: "move",
      dropEffect: "move"
    }).setData("text", JSON.stringify({
      dragId: dragId, xType: xType
    }));
  }
};

exports.default = fnDnD;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\decorators\fnDnD.js.map