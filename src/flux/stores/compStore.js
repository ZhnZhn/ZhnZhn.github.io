import {
  bindTo,
  createStoreWithSelector,
  getStoreApi,
  fCrStoreSlice,
  fCrUse
} from '../storeApi';

import {
  MDT_ALERT
} from '../../constants/ModalDialogType';

import { uncheckActiveCheckbox } from './chartCheckBoxLogic';
import { uncheckActiveContCheckBox } from './contCheckBoxLogic';
import { setMenuItemClose } from './browserLogic';

import {
  showDialogImpl,
  showOptionDialogImpl
} from './dialogLogic';

const [
  _crMsAbout,
  _selectMsAbout
] = fCrStoreSlice("msAbout", "is")
, [
  _crMsChartCont,
  _selectMsChartCont
] = fCrStoreSlice("msChartCont")
, [
  _crMdOption,
  _selectMdOption
] = fCrStoreSlice("mdOption")
, [
  _crMsShowDialog,
  _selectMsShowDialog
] = fCrStoreSlice("msShowDialog")
, [
  _crMsCloseDialog,
  _selectMsCloseDialog
] = fCrStoreSlice("msCloseDialog");

const _crStore = () => ({
  ..._crMsAbout(true),
  ..._crMdOption()
})
, _compStore = createStoreWithSelector(_crStore)
, [_set] = getStoreApi(_compStore);

export const useMsAbout = fCrUse(_compStore, _selectMsAbout)
export const showAbout = () => _set(_crMsAbout(true))
export const hideAbout = () => _set(_crMsAbout(false))

export const useMsChartCont = fCrUse(_compStore, _selectMsChartCont)
export const closeChartCont = (chartType) => _set(_crMsChartCont({ id: chartType }))
export const closeChartContainer = (chartType, browserType) => {
  uncheckActiveContCheckBox(chartType);
  uncheckActiveCheckbox(chartType);
  setMenuItemClose(chartType, browserType);
}

export const useMdOption = fCrUse(_compStore, _selectMdOption)
export const showModalDialog = (
  modalDialogType,
  option={}
) => {
  option.modalDialogType = modalDialogType
  _set(_crMdOption({...option}))
}
export const showAlertDialog = bindTo(showModalDialog, MDT_ALERT)

const INITED_DIALOGS = {};
export const useMsShowDialog = fCrUse(_compStore, _selectMsShowDialog)
export const showDialog = (type, browserType, dialogConfOr) => {
  showDialogImpl(
    INITED_DIALOGS, { type, browserType, dialogConfOr }
  ).then(r => {
     _set(_crMsShowDialog(r))
  });
}
export const showOptionDialog = (type, option) => {
  showOptionDialogImpl(
    INITED_DIALOGS, { type, data: option }
  ).then(r => {
    _set(_crMsShowDialog(r))
  })
  .catch(err => {
    showAlertDialog({
      alertCaption: 'Failed Load',
      alertDescr: err.message
    })
  });
}

export const useMsCloseDialog = fCrUse(_compStore, _selectMsCloseDialog)
export const closeDialog = (Comp) => {
  _set(_crMsCloseDialog({
    type: Comp.key,
    caption: Comp.props.caption
  }))
}
