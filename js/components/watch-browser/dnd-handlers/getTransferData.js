"use strict";

exports.__esModule = true;
exports.default = void 0;

const getTransferData = event => JSON.parse(event.dataTransfer.getData("text"));

var _default = getTransferData;
exports.default = _default;
//# sourceMappingURL=getTransferData.js.map