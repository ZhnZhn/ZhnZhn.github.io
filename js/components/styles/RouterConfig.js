"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ConfigGeneral = _interopRequireDefault(require("./ConfigGeneral"));

var _ConfigHeaderBar = _interopRequireDefault(require("./ConfigHeaderBar"));

var _ConfigElement = _interopRequireDefault(require("./ConfigElement"));

var _ConfigRowCheckBox = _interopRequireDefault(require("./ConfigRowCheckBox"));

var _ConfigLogos = _interopRequireDefault(require("./ConfigLogos"));

var router = {
  DF: _ConfigGeneral["default"],

  /*
  ABOUT: General,
  BROWSER: General,
  DRAGGABLE_DIALOG: General,
  MODAL_DIALOG: General,
  MODAL_PANE: General,
  CHART_CONTAINER: General,
  SCROLL_PANE: General,
  */
  HEADER_BAR: _ConfigHeaderBar["default"],

  /*
    BrowserCaption, ButtonTab, MenuBadge, Tab,
    MenuTab, ModalPopup
  */
  ELEMENT: _ConfigElement["default"],
  ROW_CHECKBOX: _ConfigRowCheckBox["default"],
  LOGOS: _ConfigLogos["default"]
};
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=RouterConfig.js.map