
import { ComponentActionTypes as CAT } from '../actions/ComponentActions';
import Factory from '../logic/Factory';

const ItemDialogLogic = {

  showItemDialog(slice, itemConf){
    const { type , browserType, conf } = itemConf;
    if (slice[type]){
      return Promise.resolve({ key: type });
    } else {
      return Factory.createDialog(type, browserType, conf)
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
    this.trigger(CAT.SHOW_ABOUT);
  },

  onShowDialog(type, browserType, conf){
    ItemDialogLogic.showItemDialog(
      this.dialogInit, { type, browserType, conf }
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
