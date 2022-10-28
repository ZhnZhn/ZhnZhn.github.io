export { crError } from '../AdapterFn';

import {
  isArr,
  ymdToUTC
} from '../AdapterFn';

const _crInfo = ({
  title,
  subtitle,
  items
}) => ({
  name: `${title}: ${subtitle} (${items[1].c || ''})`
});

const _getCountryIndicator = (
  { items=[] }
) => ({
  country: items[0].v,
  indicator: items[1].v
});


export const getCi = _getCountryIndicator

export const crData = (json) => {
   const arrIn = json[1];
   if (!isArr(arrIn)) {
     return [];
   }
   const d = [];
   arrIn.forEach(p => {
     if (p && p.value != null && p.date) {
       d.push({
         x: ymdToUTC(p.date),
         y: p.value
       })
     }
   })
   return d.reverse();
}

export const crConfOption = (option) => {
   const {
     _itemKey,
     title,
     linkItem,
     dataSource
   } = option;
   return {
     info: _crInfo(option),
     zhConfig: {
       key: _itemKey,
       id: _itemKey,
       itemCaption: title,
       linkFn: 'DF',
       item: { ...linkItem },
       dataSource
     }
   };
}
