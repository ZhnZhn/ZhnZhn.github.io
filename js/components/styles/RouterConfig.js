"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ConfigGeneral = _interopRequireDefault(require("./ConfigGeneral"));
var _ConfigElement = _interopRequireDefault(require("./ConfigElement"));
const router = {
  DF: _ConfigGeneral.default,
  /*
  DRAGGABLE_DIALOG: General,
  MODAL_DIALOG: General,
  MODAL_PANE: General,
  CHART_CONTAINER: General,
  SCROLL_PANE: General,
  */

  ELEMENT: _ConfigElement.default
  /*
    BrowserCaption,
    ButtonTab,
    MenuBadge,
    Tab,
    ModalPopup
  */
};
var _default = router;
exports.default = _default;
//# sourceMappingURL=RouterConfig.js.map