import {
  CAT_SHOW_DIALOG,
  CAT_CLOSE_DIALOG
} from '../actions/ComponentActions';

import { showAlertDialog } from './compStore';
import { setMenuItemClose } from './browserLogic';
import { uncheckActiveCheckbox } from './chartCheckBoxLogic';
import { uncheckActiveContCheckBox } from './contCheckBoxLogic';

import {
  showItemDialog,
  showOptionDialog
} from './comp/DialogLogicFn';

const ComponentSlice = {
  dialogInit : {},

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
      showAlertDialog({
        alertCaption: 'Failed Load',
        alertDescr: err.message
      })
    });
  },

  onCloseChartContainer(chartType, browserType){
    uncheckActiveContCheckBox(chartType);
    uncheckActiveCheckbox(chartType);
    setMenuItemClose(chartType, browserType);
  }

}

export default ComponentSlice
