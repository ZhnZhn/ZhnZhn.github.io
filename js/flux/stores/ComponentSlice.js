'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComponentActions = require('../actions/ComponentActions');

var _Factory = require('../logic/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentSlice = {
  dialogInit: {},
  onShowAbout: function onShowAbout() {
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_ABOUT);
  },
  onShowBrowser: function onShowBrowser(browserType) {
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_BROWSER, browserType);
  },
  onShowDialog: function onShowDialog(dialogType, browserType) {
    if (this.dialogInit[dialogType]) {
      this.trigger(_ComponentActions.ComponentActionTypes.SHOW_DIALOG, dialogType);
    } else {
      this.dialogInit[dialogType] = true;
      var dialogComp = _Factory2.default.createDialog(dialogType, browserType);
      this.trigger(_ComponentActions.ComponentActionTypes.INIT_AND_SHOW_DIALOG, { dialogType: dialogType, dialogComp: dialogComp });
    }
  }
};

exports.default = ComponentSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\ComponentSlice.js.map