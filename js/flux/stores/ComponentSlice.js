"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ComponentActions = require("../actions/ComponentActions");

var _BrowserActions = require("../actions/BrowserActions");

var _Factory = _interopRequireDefault(require("../logic/Factory"));

var _ModalDialogType = require("../../constants/ModalDialogType");

const ItemDialogLogic = {
  showItemDialog(slice, menuItemConf, store) {
    const {
      type,
      browserType,
      dialogConfOr
    } = menuItemConf;

    if (slice[type]) {
      return Promise.resolve({
        key: type
      });
    } else {
      const _dialogConf = store.getDialogConf(dialogConfOr, type);

      return _Factory.default.createDialog(browserType, _dialogConf).then(Comp => {
        slice[type] = true;
        return {
          key: type,
          Comp
        };
      });
    }
  },

  showOptionDialog(slice, options) {
    const {
      type,
      data
    } = options;

    if (slice[type]) {
      return Promise.resolve({
        key: type,
        data
      });
    } else {
      options.dialogType = type;
      return _Factory.default.createOptionDialog(options).then(Comp => {
        slice[type] = true;
        return {
          key: type,
          Comp,
          data
        };
      });
    }
  }

};
const CheckBoxChartLogic = {
  toggle(slice, options) {
    const {
      isCheck,
      checkBox,
      chart
    } = options;

    if (isCheck) {
      const activeCheckbox = slice.activeCheckbox;

      if (activeCheckbox && activeCheckbox !== checkBox) {
        activeCheckbox.setUnchecked();
      }

      slice.activeCheckbox = checkBox;
      slice.activeChart = chart;
    } else {
      slice.activeCheckbox = null;
      slice.activeChart = null;
    }
  },

  uncheckActive(slice, chartType) {
    const activeCheckbox = slice.activeCheckbox;

    if (activeCheckbox && (!chartType || activeCheckbox.chartType === chartType)) {
      activeCheckbox.setUnchecked();
      slice.activeCheckbox = null;
      slice.activeChart = null;
    }
  }

};
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
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, option);
  },

  onShowAbout() {
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_ABOUT);
  },

  onShowDialog(type, browserType, dialogConfOr) {
    ItemDialogLogic.showItemDialog(this.dialogInit, {
      type,
      browserType,
      dialogConfOr
    }, this).then(r => {
      this.trigger(_ComponentActions.ComponentActionTypes.SHOW_DIALOG, r);
    });
  },

  onCloseDialog(Comp) {
    this.trigger(_ComponentActions.ComponentActionTypes.CLOSE_DIALOG, {
      type: Comp.key,
      caption: Comp.props.caption
    });
  },

  onShowOptionDialog(type, option) {
    ItemDialogLogic.showOptionDialog(this.dialogInit, {
      type,
      data: option
    }).then(r => {
      this.trigger(_ComponentActions.ComponentActionTypes.SHOW_DIALOG, r);
    }).catch(err => {
      this.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, {
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
    this.trigger(_ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2, chartType);
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
    CheckBoxChartLogic.toggle(this, {
      isCheck,
      checkBox,
      chart
    });
  },

  uncheckActiveCheckbox(chartType) {
    CheckBoxChartLogic.uncheckActive(this, chartType);
  },

  onShowModalDialog(modalDialogType, option) {
    if (option === void 0) {
      option = {};
    }

    option.modalDialogType = modalDialogType;
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, option);
  },

  onChangeTheme(themeName) {
    this.trigger(_ComponentActions.ComponentActionTypes.CHANGE_THEME, themeName);
  }

};
var _default = ComponentSlice;
exports.default = _default;
//# sourceMappingURL=ComponentSlice.js.map