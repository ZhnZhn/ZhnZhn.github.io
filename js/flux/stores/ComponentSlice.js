"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ComponentActions = require("../actions/ComponentActions");
var _ModalDialogType = require("../../constants/ModalDialogType");
var _ContCheckBoxLogicFn = require("./comp/ContCheckBoxLogicFn");
var _DialogLogicFn = require("./comp/DialogLogicFn");
var _ItemCheckBoxLogicFn = require("./comp/ItemCheckBoxLogicFn");
const ComponentSlice = {
  dialogInit: {},
  showAlertDialog(option) {
    if (option === void 0) {
      option = {};
    }
    option.modalDialogType = _ModalDialogType.MDT_ALERT;
    this.trigger(_ComponentActions.CAT_SHOW_MODAL_DIALOG, option);
  },
  onShowAbout() {
    this.trigger(_ComponentActions.CAT_SHOW_ABOUT);
  },
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
      this.trigger(_ComponentActions.CAT_SHOW_MODAL_DIALOG, {
        modalDialogType: 'alert',
        alertCaption: 'Failed Load',
        alertDescr: err.message
      });
    });
  },
  onCloseChartContainer(chartType, browserType) {
    this.uncheckActiveContChb(chartType);
    this.uncheckActiveCheckbox(chartType);
    this.setMenuItemClose(chartType, browserType);
  },
  onCloseChartContainer2(chartType, browserType) {
    this.trigger(_ComponentActions.CAT_CLOSE_CHART_CONTAINER_2, chartType);
  },
  onSetActiveContainer(chartType, browserType, checkBox, isCheck) {
    checkBox.chartType = chartType;
    checkBox.browserType = browserType;
    (0, _ContCheckBoxLogicFn.toggleContCheckBox)(this, checkBox, isCheck);
  },
  uncheckActiveContChb(chartType) {
    (0, _ContCheckBoxLogicFn.uncheckActiveContCheckBox)(this, chartType);
  },
  isLoadToChart() {
    if (this.activeChart) {
      return this.activeChart.options.zhConfig.id;
    } else {
      return false;
    }
  },
  getActiveChart() {
    return this.activeChart;
  },
  onSetActiveCheckbox(isCheck, checkBox, chart) {
    (0, _ItemCheckBoxLogicFn.toggleItemCheckBox)(this, {
      isCheck,
      checkBox,
      chart
    });
  },
  uncheckActiveCheckbox(chartType) {
    (0, _ItemCheckBoxLogicFn.uncheckActiveItemCheckBox)(this, chartType);
  },
  onShowModalDialog(modalDialogType, option) {
    if (option === void 0) {
      option = {};
    }
    option.modalDialogType = modalDialogType;
    this.trigger(_ComponentActions.CAT_SHOW_MODAL_DIALOG, option);
  },
  onChangeTheme(themeName) {
    this.trigger(_ComponentActions.CAT_CHANGE_THEME, themeName);
  }
};
var _default = ComponentSlice;
exports.default = _default;
//# sourceMappingURL=ComponentSlice.js.map