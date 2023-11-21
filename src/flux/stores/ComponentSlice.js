import {
  CAT_SHOW_DIALOG,
  CAT_CLOSE_DIALOG,
  CAT_CLOSE_CHART_CONTAINER_2
} from '../actions/ComponentActions';

import { showModalDialog } from './compStore';
import { uncheckActiveCheckbox } from './chartCheckBoxLogic';

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

const ComponentSlice = {
  dialogInit : {},

  showAlertDialog(option={}){
    option.modalDialogType = MDT_ALERT;
    showModalDialog(MDT_ALERT, option)
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
      showModalDialog(MDT_ALERT, {
        alertCaption: 'Failed Load',
        alertDescr: err.message
      })
    });
  },

  onCloseChartContainer(chartType, browserType){
    this.uncheckActiveContChb(chartType);
    uncheckActiveCheckbox(chartType);
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
  }
}

export default ComponentSlice
