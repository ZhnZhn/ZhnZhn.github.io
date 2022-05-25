"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ComponentActions = require("../actions/ComponentActions");

var _BrowserActions = require("../actions/BrowserActions");

var _ModalDialogType = require("../../constants/ModalDialogType");

var _DialogLogicFn = require("./comp/DialogLogicFn");

var _ItemCheckBoxLogicFn = require("./comp/ItemCheckBoxLogicFn");

const ChbContLogic = {
  _check(slice, checkBox) {
    const _chb = slice.activeContChb;

    if (_chb) {
      _chb.setUnchecked();
    }

    slice.activeContChb = checkBox;
  },

  _uncheck(slice) {
    slice.activeContChb = null;
  },

  toggle(slice, _ref) {
    let {
      isCheck,
      checkBox
    } = _ref;

    if (isCheck) {
      ChbContLogic._check(slice, checkBox);
    } else {
      ChbContLogic._uncheck(slice);
    }
  },

  uncheckActive(slice, chartType) {
    const _chb = slice.activeContChb;

    if (_chb && _chb.chartType === chartType) {
      _chb.setUnchecked();

      slice.activeContChb = null;
    }
  }

};
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

    if (this.isWithItemCounter(browserType)) {
      this.setMenuItemClose(chartType, browserType);
      this.trigger(_BrowserActions.BAT_UPDATE_BROWSER_MENU, browserType);
    }
  },

  onCloseChartContainer2(chartType, browserType) {
    this.trigger(_ComponentActions.CAT_CLOSE_CHART_CONTAINER_2, chartType);
  },

  onSetActiveContainer(isCheck, checkBox) {
    ChbContLogic.toggle(this, {
      isCheck,
      checkBox
    });
  },

  uncheckActiveContChb(chartType) {
    ChbContLogic.uncheckActive(this, chartType);
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