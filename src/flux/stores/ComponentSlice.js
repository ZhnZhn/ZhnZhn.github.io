
import { ComponentActionTypes as CAT } from '../actions/ComponentActions';
import { BrowserActionTypes as BAT } from '../actions/BrowserActions';
import Factory from '../logic/Factory';

import { ModalDialog } from '../../constants/Type';

const ItemDialogLogic = {

  showItemDialog(slice, menuItemConf, store){
    const { type, browserType, dialogConfOr } = menuItemConf;
    if (slice[type]){
      return Promise.resolve({ key: type });
    } else {
      const _dialogConf = store.getDialogConf(dialogConfOr, type);
      return Factory.createDialog(browserType, _dialogConf)
        .then(Comp => {
             slice[type] = true
             return { key:type, Comp };
         });
    }
  },

  showOptionDialog(slice, options){
    const { type, data } = options;
    if (slice[type]) {
      return Promise.resolve({ key: type, data });
    } else {
      options.dialogType = type
      return Factory.createOptionDialog(options)
         .then(Comp => {
             slice[type] = true
             return { key: type, Comp, data };
         })
    }
  }

}

const CheckBoxChartLogic = {
  toggle(slice, options){
    const { isCheck, checkBox, chart } = options;
    if (isCheck){
       const activeCheckbox = slice.activeCheckbox;
       if (activeCheckbox && activeCheckbox !== checkBox){
          activeCheckbox.setUnchecked()
       }
       slice.activeCheckbox = checkBox
       slice.activeChart = chart
    } else {
      slice.activeCheckbox = null
      slice.activeChart = null
    }
  },

  uncheckActive(slice, chartType){
    const activeCheckbox = slice.activeCheckbox;
    if ( activeCheckbox &&
     (!chartType || activeCheckbox.chartType === chartType) ){
       activeCheckbox.setUnchecked()
       slice.activeCheckbox = null
       slice.activeChart = null
    }
  }
};

const ChbContLogic = {
  _check(slice, checkBox) {
    const _chb = slice.activeContChb;
    if (_chb) {
      _chb.setUnchecked()
    }
    slice.activeContChb = checkBox
  },
  _uncheck(slice) {
    slice.activeContChb = null
  },

  toggle(slice, { isCheck, checkBox }){
    if (isCheck) {
      ChbContLogic._check(slice, checkBox)
    } else {
      ChbContLogic._uncheck(slice)
    }
  },

  uncheckActive(slice, chartType) {
    const _chb = slice.activeContChb;
    if (_chb && _chb.chartType === chartType) {
      _chb.setUnchecked()
      slice.activeContChb = null
    }
  }
};

const ComponentSlice = {
  dialogInit : {},

  showAlertDialog(option={}){
    option.modalDialogType = ModalDialog.ALERT;
    this.trigger(CAT.SHOW_MODAL_DIALOG, option);
  },

  onShowAbout(){
    this.trigger(CAT.SHOW_ABOUT);
  },

  onShowDialog(type, browserType, dialogConfOr){
    ItemDialogLogic.showItemDialog(
      this.dialogInit, { type, browserType, dialogConfOr }, this
    ).then(r => {
       this.trigger(CAT.SHOW_DIALOG, r)
    });
  },

  onCloseDialog(Comp) {
    this.trigger(CAT.CLOSE_DIALOG, {
      type: Comp.key,
      caption: Comp.props.caption
    })
  },

  onShowOptionDialog(type, option){
    ItemDialogLogic.showOptionDialog(
      this.dialogInit, { type, data: option }
    ).then(r => {
      this.trigger(CAT.SHOW_DIALOG, r)
    })
    .catch(err => {
      this.trigger(CAT.SHOW_MODAL_DIALOG, {
        modalDialogType: 'alert',
        alertCaption: 'Failed Load',
        alertDescr: err.message
      })
    });
  },

  onCloseChartContainer(chartType, browserType){
    this.uncheckActiveContChb(chartType);
    this.uncheckActiveCheckbox(chartType);
    if(this.isWithItemCounter(browserType)){
      this.setMenuItemClose(chartType, browserType);
      this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
    }
  },
  onCloseChartContainer2(chartType, browserType){
    this.trigger(CAT.CLOSE_CHART_CONTAINER_2, chartType);
  },
  onSetActiveContainer(isCheck, checkBox){
    ChbContLogic.toggle(this, { isCheck, checkBox })
  },
  uncheckActiveContChb(chartType){
    ChbContLogic.uncheckActive(this, chartType)
  },

  isLoadToChart(){
    if (this.activeChart){
      return this.activeChart.options.zhConfig.id;
    } else {
      return false;
    }
  },
  getActiveChart(){
    return this.activeChart;
  },
  onSetActiveCheckbox(isCheck, checkBox, chart){
    CheckBoxChartLogic.toggle(this, {isCheck, checkBox, chart})
  },
  uncheckActiveCheckbox(chartType){
    CheckBoxChartLogic.uncheckActive(this, chartType)
  },

  onShowModalDialog(modalDialogType, option={}){
    option.modalDialogType = modalDialogType;
    this.trigger(CAT.SHOW_MODAL_DIALOG, option);
  },

  onChangeTheme(themeName){
    this.trigger(CAT.CHANGE_THEME, themeName)
  }
}

export default ComponentSlice
