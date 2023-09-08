import {
  CAT_SHOW_ABOUT,
  CAT_SHOW_DIALOG,
  CAT_CLOSE_DIALOG,
  CAT_SHOW_MODAL_DIALOG,
  CAT_CLOSE_CHART_CONTAINER_2
} from '../actions/ComponentActions';

import {
  MDT_ALERT
} from '../../constants/ModalDialogType';

import {
  toggleContCheckBox,
  uncheckActiveContCheckBox
} from './comp/ContCheckBoxLogicFn';
import {
  showItemDialog,
  showOptionDialog
} from './comp/DialogLogicFn';
import {
  toggleItemCheckBox,
  uncheckActiveItemCheckBox
} from './comp/ItemCheckBoxLogicFn';

const ComponentSlice = {
  dialogInit : {},

  showAlertDialog(option={}){
    option.modalDialogType = MDT_ALERT;
    this.trigger(CAT_SHOW_MODAL_DIALOG, option);
  },

  onShowAbout(){
    this.trigger(CAT_SHOW_ABOUT);
  },

  onShowDialog(type, browserType, dialogConfOr){
    showItemDialog(
      this, this.dialogInit, { type, browserType, dialogConfOr }
    ).then(r => {
       this.trigger(CAT_SHOW_DIALOG, r)
    });
  },

  onCloseDialog(Comp) {
    this.trigger(CAT_CLOSE_DIALOG, {
      type: Comp.key,
      caption: Comp.props.caption
    })
  },

  onShowOptionDialog(type, option){
    showOptionDialog(
      this.dialogInit, { type, data: option }
    ).then(r => {
      this.trigger(CAT_SHOW_DIALOG, r)
    })
    .catch(err => {
      this.trigger(CAT_SHOW_MODAL_DIALOG, {
        modalDialogType: 'alert',
        alertCaption: 'Failed Load',
        alertDescr: err.message
      })
    });
  },

  onCloseChartContainer(chartType, browserType){
    this.uncheckActiveContChb(chartType);
    this.uncheckActiveCheckbox(chartType);
    this.setMenuItemClose(chartType, browserType);
  },
  onCloseChartContainer2(chartType, browserType){
    this.trigger(CAT_CLOSE_CHART_CONTAINER_2, chartType);
  },
  onSetActiveContainer(chartType, browserType, checkBox, isCheck){
    checkBox.chartType = chartType
    checkBox.browserType = browserType
    toggleContCheckBox(this, checkBox, isCheck)
  },
  uncheckActiveContChb(chartType){
    uncheckActiveContCheckBox(this, chartType)
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
    toggleItemCheckBox(this, {isCheck, checkBox, chart})
  },
  uncheckActiveCheckbox(chartType){
    uncheckActiveItemCheckBox(this, chartType)
  },

  onShowModalDialog(modalDialogType, option={}){
    option.modalDialogType = modalDialogType;
    this.trigger(CAT_SHOW_MODAL_DIALOG, option);
  }
}

export default ComponentSlice
