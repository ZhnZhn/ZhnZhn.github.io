import {
  isArr,
  ymdToUTC
} from '../AdapterFn';

const _crInfo = ({
  title,
  subtitle
}) => ({
  name: `${title}: ${subtitle}`
});

export const getCi = (
  { items=[] }
) => [
  //country
  items[0].v,
  //indicator
  items[1].v
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
