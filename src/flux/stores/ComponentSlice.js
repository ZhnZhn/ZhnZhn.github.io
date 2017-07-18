
import {ComponentActionTypes} from '../actions/ComponentActions';
import Factory from '../logic/Factory';

const ItemDialogLogic = {
  showItemDialog(slice, itemConf){
    const { type , browserType } = itemConf;
    if (slice[type]){
      return { key: type };
    } else {
      const Comp = Factory.createDialog(type, browserType);
      slice[type] = true
      return { key:type, Comp };
    }
  },

  showOptionDialog(slice, options){
    const { type, data } = options;
    if (slice[type]) {
      return { key: type, data };
    } else {
      options.dialogType = type
      const Comp = Factory.createOptionDialog(options)
      slice[type] = true
      return { key: type, Comp, data };
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
    if ( activeCheckbox && activeCheckbox.chartType === chartType ){
       activeCheckbox.setUnchecked()
       slice.activeCheckbox = null
       slice.activeChart = null
    }
  }
}

const ComponentSlice = {
  dialogInit : {},
  onShowAbout(){
    this.trigger(ComponentActionTypes.SHOW_ABOUT);
  },
  onShowDialog(type, browserType){
    const r = ItemDialogLogic.showItemDialog(
      this.dialogInit, { type, browserType }
    );
    this.trigger(ComponentActionTypes.SHOW_DIALOG, r)
  },
  onShowOptionDialog(type, option){
    const r = ItemDialogLogic.showOptionDialog(
      this.dialogInit, { type, data: option }
    );
    this.trigger(ComponentActionTypes.SHOW_DIALOG, r)
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
    this.trigger(ComponentActionTypes.SHOW_MODAL_DIALOG, option);
  }
}

export default ComponentSlice
