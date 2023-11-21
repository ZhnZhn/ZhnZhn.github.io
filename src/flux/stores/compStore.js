import {
  createStoreWithSelector,
  getStoreApi,
  fCrStoreSlice,
  fCrUse
} from '../storeApi';

const [
  _crMsAbout,
  _selectMsAbout
] = fCrStoreSlice("msAbout", "is")
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

export const useMdOption = fCrUse(_compStore, _selectMdOption)
export const showModalDialog = (
  modalDialogType,
  option={}
) => {
  option.modalDialogType = modalDialogType
  _set(_crMdOption({...option}))
}
