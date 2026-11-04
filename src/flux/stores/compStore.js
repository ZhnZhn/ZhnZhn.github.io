import {
  bindTo,
  createStoreWithSelector,
  getStoreApi,
  fCrStoreSlice,
  fCrUse
} from '../storeApi';

import {
  MDT_DESCRIPTION,
  MDT_SETTINGS,
  MDT_PASTE_TO,
  MDT_ZOOM,
  MDT_RELOAD,
  MDT_ASK,
  MDT_CUSTOMIZE_EXPORT,
  MDT_ADD_TO_WATCH,
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

const _setMsAbout = is => _set(_crMsAbout(is));
export const useMsAbout = fCrUse(_compStore, _selectMsAbout)
export const showAbout = () => _setMsAbout(true)
export const hideAbout = () => _setMsAbout(false)

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

export const showDescription = bindTo(showModalDialog, MDT_DESCRIPTION)
, showSettings = bindTo(showModalDialog, MDT_SETTINGS)
, showPasteTo = bindTo(showModalDialog, MDT_PASTE_TO)
, showZoom = bindTo(showModalDialog, MDT_ZOOM)
, showReload = bindTo(showModalDialog, MDT_RELOAD)
, showAsk = bindTo(showModalDialog, MDT_ASK)
, showCustomizeExport = bindTo(showModalDialog, MDT_CUSTOMIZE_EXPORT)
, showAddToWatch = bindTo(showModalDialog, MDT_ADD_TO_WATCH)
, showAlertDialog = bindTo(showModalDialog, MDT_ALERT)

export const showAlertDialogBy = (
  alertCaption,
  alertDescr
) => showAlertDialog({
  alertCaption,
  alertDescr
})

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
    showAlertDialogBy(
      'Failed Load',
      err.message
    )
  });
}

export const useMsCloseDialog = fCrUse(_compStore, _selectMsCloseDialog)
export const closeDialog = (Comp) => {
  _set(_crMsCloseDialog({
    type: Comp.key,
    caption: Comp.props.caption
  }))
}
