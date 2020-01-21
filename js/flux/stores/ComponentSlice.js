"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ComponentActions = require("../actions/ComponentActions");

var _BrowserActions = require("../actions/BrowserActions");

var _Factory = _interopRequireDefault(require("../logic/Factory"));

var _Type = require("../../constants/Type");

var ItemDialogLogic = {
  showItemDialog: function showItemDialog(slice, itemConf, store) {
    var type = itemConf.type,
        browserType = itemConf.browserType,
        conf = itemConf.conf;

    if (slice[type]) {
      return Promise.resolve({
        key: type
      });
    } else {
      var dialogConf = store.getDialogConf(conf, type);
      return _Factory["default"].createDialog(browserType, dialogConf).then(function (Comp) {
        slice[type] = true;
        return {
          key: type,
          Comp: Comp
        };
      });
    }
  },
  showOptionDialog: function showOptionDialog(slice, options) {
    var type = options.type,
        data = options.data;

    if (slice[type]) {
      return Promise.resolve({
        key: type,
        data: data
      });
    } else {
      options.dialogType = type;
      return _Factory["default"].createOptionDialog(options).then(function (Comp) {
        slice[type] = true;
        return {
          key: type,
          Comp: Comp,
          data: data
        };
      });
    }
  }
};
var CheckBoxChartLogic = {
  toggle: function toggle(slice, options) {
    var isCheck = options.isCheck,
        checkBox = options.checkBox,
        chart = options.chart;

    if (isCheck) {
      var activeCheckbox = slice.activeCheckbox;

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
  uncheckActive: function uncheckActive(slice, chartType) {
    var activeCheckbox = slice.activeCheckbox;

    if (activeCheckbox && (!chartType || activeCheckbox.chartType === chartType)) {
      activeCheckbox.setUnchecked();
      slice.activeCheckbox = null;
      slice.activeChart = null;
    }
  }
};
var ChbContLogic = {
  _check: function _check(slice, checkBox) {
    if (slice.activeContChb) {
      slice.activeContChb.setUnchecked();
    }

    slice.activeContChb = checkBox;
  },
  _uncheck: function _uncheck(slice) {
    slice.activeContChb.setUnchecked();
    slice.activeContChb = null;
  },
  toggle: function toggle(slice, _ref) {
    var isCheck = _ref.isCheck,
        checkBox = _ref.checkBox;

    if (isCheck) {
      this._check(slice, checkBox);
    } else {
      this._uncheck(slice);
    }
  },
  uncheckActive: function uncheckActive(slice, chartType) {
    if (slice.activeContChb) {
      this._uncheck(slice);
    }
  }
};
var ComponentSlice = {
  dialogInit: {},
  showAlertDialog: function showAlertDialog(option) {
    if (option === void 0) {
      option = {};
    }

    option.modalDialogType = _Type.ModalDialog.ALERT;
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, option);
  },
  onShowAbout: function onShowAbout() {
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_ABOUT);
  },
  onShowDialog: function onShowDialog(type, browserType, conf) {
    var _this = this;

    ItemDialogLogic.showItemDialog(this.dialogInit, {
      type: type,
      browserType: browserType,
      conf: conf
    }, this).then(function (r) {
      _this.trigger(_ComponentActions.ComponentActionTypes.SHOW_DIALOG, r);
    });
  },
  onCloseDialog: function onCloseDialog(Comp) {
    this.trigger(_ComponentActions.ComponentActionTypes.CLOSE_DIALOG, {
      type: Comp.key,
      caption: Comp.props.caption
    });
  },
  onShowOptionDialog: function onShowOptionDialog(type, option) {
    var _this2 = this;

    ItemDialogLogic.showOptionDialog(this.dialogInit, {
      type: type,
      data: option
    }).then(function (r) {
      _this2.trigger(_ComponentActions.ComponentActionTypes.SHOW_DIALOG, r);
    })["catch"](function (err) {
      _this2.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, {
        modalDialogType: 'alert',
        alertCaption: 'Failed Load',
        alertDescr: err.message
      });
    });
  },
  onCloseChartContainer: function onCloseChartContainer(chartType, browserType) {
    this.uncheckActiveContChb(chartType);
    this.uncheckActiveCheckbox(chartType);

    if (this.isWithItemCounter(browserType)) {
      this.setMenuItemClose(chartType, browserType);
      this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
    }
  },
  onCloseChartContainer2: function onCloseChartContainer2(chartType, browserType) {
    this.trigger(_ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2, chartType);
  },
  onSetActiveContainer: function onSetActiveContainer(isCheck, checkBox) {
    ChbContLogic.toggle(this, {
      isCheck: isCheck,
      checkBox: checkBox
    });
  },
  uncheckActiveContChb: function uncheckActiveContChb(chartType) {
    ChbContLogic.uncheckActive(this, chartType);
  },
  isLoadToChart: function isLoadToChart() {
    if (this.activeChart) {
      return this.activeChart.options.zhConfig.id;
    } else {
      return false;
    }
  },
  getActiveChart: function getActiveChart() {
    return this.activeChart;
  },
  onSetActiveCheckbox: function onSetActiveCheckbox(isCheck, checkBox, chart) {
    CheckBoxChartLogic.toggle(this, {
      isCheck: isCheck,
      checkBox: checkBox,
      chart: chart
    });
  },
  uncheckActiveCheckbox: function uncheckActiveCheckbox(chartType) {
    CheckBoxChartLogic.uncheckActive(this, chartType);
  },
  onShowModalDialog: function onShowModalDialog(modalDialogType, option) {
    if (option === void 0) {
      option = {};
    }

    option.modalDialogType = modalDialogType;
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, option);
  },
  onChangeTheme: function onChangeTheme(themeName) {
    this.trigger(_ComponentActions.ComponentActionTypes.CHANGE_THEME, themeName);
  }
};
var _default = ComponentSlice;
exports["default"] = _default;
//# sourceMappingURL=ComponentSlice.js.map