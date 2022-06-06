import { getRefValue } from '../../uiApi';

const getFromToDates = (refDates) => {
 const _datesComp = getRefValue(refDates)
 return _datesComp
   ? _datesComp.getValues()
   : {};
};

export default getFromToDates;
