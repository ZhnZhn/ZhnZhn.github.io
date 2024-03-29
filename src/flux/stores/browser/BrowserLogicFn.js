import isWithItemCounter from './isWithItemCounter';
import findItemSetValue from './findItem';

const _findItemSetValue = (
  appMenu,
  bT,
  cT
) => isWithItemCounter(bT)
  ? findItemSetValue(appMenu[bT], cT)
  : void 0;

const _fEditItem = (edit) => (
  value,
  appMenu,
  bT,
  cT
) => {
  const setValue = _findItemSetValue(appMenu, bT, cT);
  if (setValue) {
    edit(setValue, value)
  }
}

const _editIsOpen = (setValue, value) => {
  setValue(prev => ({
    ...prev,
    is: value
  }))
};
export const setIsOpen = _fEditItem(_editIsOpen)


const _editPlusCounter = (setValue, value) => {
  setValue(prev => ({
    value: prev.value + value,
    is: true
  }))
};
export const plusCounter = _fEditItem(_editPlusCounter)

const _editResetCounter = (setValue, value) => {
  setValue(prev => ({
    ...prev,
    value
  }))
};
export const resetCounter = _fEditItem(_editResetCounter)
  .bind(null, 0)
