'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComponentActions = require('../actions/ComponentActions');

var _Factory = require('../logic/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemDialogLogic = {
  showItemDialog: function showItemDialog(slice, itemConf) {
    var type = itemConf.type,
        browserType = itemConf.browserType;

    if (slice[type]) {
      return Promise.resolve({ key: type });
    } else {
      return _Factory2.default.createDialog(type, browserType).then(function (Comp) {
        slice[type] = true;
        return { key: type, Comp: Comp };
      });
    }
  },
  showOptionDialog: function showOptionDialog(slice, options) {
    var type = options.type,
        data = options.data;

    if (slice[type]) {
      return Promise.resolve({ key: type, data: data });
    } else {
      options.dialogType = type;
      return _Factory2.default.createOptionDialog(options).then(function (Comp) {
        slice[type] = true;
        return { key: type, Comp: Comp, data: data };
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
    if (activeCheckbox && activeCheckbox.chartType === chartType) {
      activeCheckbox.setUnchecked();
      slice.activeCheckbox = null;
      slice.activeChart = null;
    }
  }
};

var ComponentSlice = {
  dialogInit: {},
  onShowAbout: function onShowAbout() {
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_ABOUT);
  },
  onShowDialog: function onShowDialog(type, browserType) {
    var _this = this;

    ItemDialogLogic.showItemDialog(this.dialogInit, { type: type, browserType: browserType }).then(function (r) {
      _this.trigger(_ComponentActions.ComponentActionTypes.SHOW_DIALOG, r);
    });
  },
  onShowOptionDialog: function onShowOptionDialog(type, option) {
    var _this2 = this;

    ItemDialogLogic.showOptionDialog(this.dialogInit, { type: type, data: option }).then(function (r) {
      _this2.trigger(_ComponentActions.ComponentActionTypes.SHOW_DIALOG, r);
    }).catch(function (err) {
      _this2.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, {
        modalDialogType: 'alert',
        alertCaption: 'Failed Load',
        alertDescr: err.message
      });
    });
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
    CheckBoxChartLogic.toggle(this, { isCheck: isCheck, checkBox: checkBox, chart: chart });
  },
  uncheckActiveCheckbox: function uncheckActiveCheckbox(chartType) {
    CheckBoxChartLogic.uncheckActive(this, chartType);
  },
  onShowModalDialog: function onShowModalDialog(modalDialogType) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    option.modalDialogType = modalDialogType;
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, option);
  }
};

exports.default = ComponentSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\ComponentSlice.js.map