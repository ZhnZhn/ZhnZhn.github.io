import {
  isArr,
  ymdToUTC,
  getValue
} from '../AdapterFn';

const _crInfo = ({
  title,
  subtitle
}) => ({
  name: `${title}: ${subtitle}`
});

export const getCi = ({
  items=[]
}) => [
  //country
  getValue(items[0]),
  //indicator
  getValue(items[1])
]

export const crData = (
  [metaData, data]
) => isArr(data) ? data.reduce((d, p) => {
  if (p && p.value != null && p.date) {
   d.push([
     ymdToUTC(p.date),
     p.value
   ])
  }
  return d;
}, []).reverse() : [];

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
