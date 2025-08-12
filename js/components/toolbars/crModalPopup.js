"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = require("../zhn-moleculs/ModalPopup");
var _ModalMenu = require("./ModalMenu.Style");
const crModalPopup = (0, _ModalPopup.fCrModalPopup)((_, style) => ({
  style: {
    ..._ModalMenu.S_MODAL_MENU,
    ...style
  }
}));
var _default = exports.default = crModalPopup;
//# sourceMappingURL=crModalPopup.js.map