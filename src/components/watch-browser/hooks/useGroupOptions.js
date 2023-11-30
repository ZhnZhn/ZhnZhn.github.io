import { useState } from '../../uiApi';

const useGroupOptions = (
  props,
  setValidationMessages,
  clearInput
) => {
  const {
    useMsEdit,
    forActionType,
    getWatchGroups
  } = props
  , [
    groupOptions,
    setGroupOptions
  ] = useState(() => getWatchGroups())

  useMsEdit(msEdit => {
    if (msEdit) {
      if (msEdit.forActionType === forActionType) {
        if (msEdit.messages) {
          setValidationMessages(msEdit.messages)
        } else {
          clearInput()
          setGroupOptions(getWatchGroups())
        }
      } else {
        setGroupOptions(getWatchGroups())
      }
    }
  })

  return groupOptions;
}

export default useGroupOptions
