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
  onShowDialog: function onShowDialog(dialogType, browserType) {
    if (this.dialogInit[dialogType]) {
      this.trigger(_ComponentActions.ComponentActionTypes.SHOW_DIALOG, dialogType);
    } else {
      this.dialogInit[dialogType] = true;
      var dialogComp = _Factory2.default.createDialog(dialogType, browserType);
      this.trigger(_ComponentActions.ComponentActionTypes.INIT_AND_SHOW_DIALOG, { dialogType: dialogType, dialogComp: dialogComp });
    }
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
    if (isCheck) {
      if (this.activeCheckbox && this.activeCheckbox !== checkBox) {
        this.activeCheckbox.setUnchecked();
      }
      this.activeCheckbox = checkBox;
      this.activeChart = chart;
    } else {
      this.activeCheckbox = null;
      this.activeChart = null;
    }
  },
  uncheckActiveCheckbox: function uncheckActiveCheckbox(chartType) {
    if (this.activeCheckbox && this.activeCheckbox.chartType === chartType) {
      this.activeCheckbox.setUnchecked();
      this.activeCheckbox = null;
      this.activeChart = null;
    }
  },
  onShowModalDialog: function onShowModalDialog(modalDialogType) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    option.modalDialogType = modalDialogType;
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, option);
  }
};

exports.default = ComponentSlice;
//# sourceMappingURL=ComponentSlice.js.map