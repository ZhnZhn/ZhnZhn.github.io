import { getRefValue } from '../../uiApi';

const checkAreDatesValid = (
  refDates,
  msgs
) => {
  const _datesComp = getRefValue(refDates);
  if (_datesComp) {
     const {
       isValid,
       datesMsg
     } = _datesComp.getValidation();
     if (!isValid) {
       msgs.push(datesMsg);
     }
  }
}

export default checkAreDatesValid
