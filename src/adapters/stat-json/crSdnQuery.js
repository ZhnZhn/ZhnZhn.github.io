import { getObjectKeys } from '../../utils/isTypeFn';
import { isCategory } from '../CategoryFn';

const _crVariable = (
  code,
  value
) => ({
  code,
  values: [value]
});

const _crVariables = items => items
  .filter(Boolean)
  .map(({ slice }) => {
     const code = getObjectKeys(slice)[0];
     return _crVariable(code, slice[code]);
  });

const _crTimeVariable = (
  seriaType,
  time,
  dfC
) => {
   const _isCategory = isCategory(seriaType)
   , _tidValue = _isCategory ? time : "*"
   , _arr = [_crVariable("Tid", _tidValue)];
   if (_isCategory){
     _arr.push(_crVariable(dfC, "*"))
   }
   return _arr;
};

const crSdnQuery = ({
  dfId,
  items,
  seriaType,
  time,
  dfC
}) => ({
  method: "POST",
  headers: {
   'Content-Type': "application/json",
  },
  body: JSON.stringify({
     lang: "en",
     table: dfId,
     format: "JSONSTAT",
     valuePresentation: "Default",
     timeOrder: "Ascending",
     variables: [
       ..._crVariables(items),
       ..._crTimeVariable(seriaType, time, dfC)
     ]
  })
});

export default crSdnQuery
