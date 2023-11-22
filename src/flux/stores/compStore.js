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
] = fCrStoreSlice("mdOption");

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

export const useMdOption = fCrUse(_compStore, _selectMdOption)
export const showModalDialog = (
  modalDialogType,
  option={}
) => {
  option.modalDialogType = modalDialogType
  _set(_crMdOption({...option}))
}
export const showAlertDialog = bindTo(showModalDialog, MDT_ALERT)
