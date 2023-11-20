import {
  createStoreWithSelector,
  getStoreApi,
  fCrStoreSlice,
  fCrUse
} from '../storeApi';

const [
  _crMdOption,
  _selectMdOption
] = fCrStoreSlice("mdOption");

const _crStore = () => ({
  ..._crMdOption()
})
, _compStore = createStoreWithSelector(_crStore)
, [_set] = getStoreApi(_compStore);

export const useMdOption = fCrUse(_compStore, _selectMdOption)
export const showModalDialog = (
  modalDialogType,
  option={}
) => {
  option.modalDialogType = modalDialogType
  _set(_crMdOption({...option}))
}
