"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ComponentActions = require("../actions/ComponentActions");
var _compStore = require("./compStore");
var _chartCheckBoxLogic = require("./chartCheckBoxLogic");
var _contCheckBoxLogic = require("./contCheckBoxLogic");
var _DialogLogicFn = require("./comp/DialogLogicFn");
const ComponentSlice = {
  dialogInit: {},
  onShowDialog(type, browserType, dialogConfOr) {
    (0, _DialogLogicFn.showItemDialog)(this, this.dialogInit, {
      type,
      browserType,
      dialogConfOr
    }).then(r => {
      this.trigger(_ComponentActions.CAT_SHOW_DIALOG, r);
    });
  },
  onCloseDialog(Comp) {
    this.trigger(_ComponentActions.CAT_CLOSE_DIALOG, {
      type: Comp.key,
      caption: Comp.props.caption
    });
  },
  onShowOptionDialog(type, option) {
    (0, _DialogLogicFn.showOptionDialog)(this.dialogInit, {
      type,
      data: option
    }).then(r => {
      this.trigger(_ComponentActions.CAT_SHOW_DIALOG, r);
    }).catch(err => {
      (0, _compStore.showAlertDialog)({
        alertCaption: 'Failed Load',
        alertDescr: err.message
      });
    });
  },
  onCloseChartContainer(chartType, browserType) {
    (0, _contCheckBoxLogic.uncheckActiveContCheckBox)(chartType);
    (0, _chartCheckBoxLogic.uncheckActiveCheckbox)(chartType);
    this.setMenuItemClose(chartType, browserType);
  }
};
var _default = exports.default = ComponentSlice;
//# sourceMappingURL=ComponentSlice.js.map