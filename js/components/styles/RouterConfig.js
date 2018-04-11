'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfigGeneral = require('./ConfigGeneral');

var _ConfigGeneral2 = _interopRequireDefault(_ConfigGeneral);

var _ConfigHeaderBar = require('./ConfigHeaderBar');

var _ConfigHeaderBar2 = _interopRequireDefault(_ConfigHeaderBar);

var _ConfigElement = require('./ConfigElement');

var _ConfigElement2 = _interopRequireDefault(_ConfigElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = {
  DF: _ConfigGeneral2.default,
  /*
  ABOUT: General,
  DRAGGABLE_DIALOG: General,
  MODAL_DIALOG: General,
  BROWSER: General,
  CHART_CONTAINER: General,
  MODAL_PANE: General,
  SCROLL_PANE: General,
  */
  HEADER_BAR: _ConfigHeaderBar2.default,
  /*
    BrowserCaption, ButtonTab, MenuBadge, Tab,
    MenuTab, ModalPopup
  */
  ELEMENT: _ConfigElement2.default
};

exports.default = router;
//# sourceMappingURL=RouterConfig.js.map