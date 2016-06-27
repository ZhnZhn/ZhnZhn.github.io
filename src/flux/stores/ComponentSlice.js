
import {ComponentActionTypes} from '../actions/ComponentActions';
import Factory from '../logic/Factory';

const ComponentSlice = {
  dialogInit : {},
  onShowAbout(){
    this.trigger(ComponentActionTypes.SHOW_ABOUT);
  },
  onShowDialog(dialogType, browserType){
    if (this.dialogInit[dialogType]) {
      this.trigger(ComponentActionTypes.SHOW_DIALOG, dialogType);
    } else {
      this.dialogInit[dialogType] = true;
      const dialogComp = Factory.createDialog(dialogType, browserType);
      this.trigger(
        ComponentActionTypes.INIT_AND_SHOW_DIALOG,
        {dialogType, dialogComp}
      );
    }
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
     if (isCheck){
        if (this.activeCheckbox && this.activeCheckbox !== checkBox){
           this.activeCheckbox.setUnchecked();
        }
        this.activeCheckbox = checkBox;
        this.activeChart = chart;
     } else {
       this.activeCheckbox = null;
       this.activeChart = null;
     }
  },

  onShowModalDialog(modalDialogType, option={}){
    option.modalDialogType = modalDialogType;
    this.trigger(ComponentActionTypes.SHOW_MODAL_DIALOG, option);
  }
}

export default ComponentSlice
