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

var _ConfigRowCheckBox = require('./ConfigRowCheckBox');

var _ConfigRowCheckBox2 = _interopRequireDefault(_ConfigRowCheckBox);

var _ConfigLogos = require('./ConfigLogos');

var _ConfigLogos2 = _interopRequireDefault(_ConfigLogos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = {
  DF: _ConfigGeneral2.default,
  /*
  ABOUT: General,
  BROWSER: General,
  DRAGGABLE_DIALOG: General,
  MODAL_DIALOG: General,
  MODAL_PANE: General,
  CHART_CONTAINER: General,
  SCROLL_PANE: General,
  */
  HEADER_BAR: _ConfigHeaderBar2.default,
  /*
    BrowserCaption, ButtonTab, MenuBadge, Tab,
    MenuTab, ModalPopup
  */

  ELEMENT: _ConfigElement2.default,
  ROW_CHECKBOX: _ConfigRowCheckBox2.default,
  LOGOS: _ConfigLogos2.default
};

exports.default = router;
//# sourceMappingURL=RouterConfig.js.map