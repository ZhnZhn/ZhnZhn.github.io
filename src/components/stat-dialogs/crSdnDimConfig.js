import {
  crDimItem,
  toFirstUpperCase
} from './dimConfigFn';

const _crSdnDimOptions = ({ values, id }) =>
 (values || []).map(item =>
    crDimItem(item.text, id, item.id));

const crSdnDimConfig = (variables) => {
  const dims = [];
  let timeId, mapFrequency = 'Y';
  variables.forEach(item => {
    const { time, text='', id } = item
    if (time) {
      timeId = id
      dims.dateOptions = item
        .values.map(({ id, text }) => ({
          caption: text,
          value: id
        })).reverse()
    } else {
      dims.push({
        c: toFirstUpperCase(text),
        v: id,
        options: _crSdnDimOptions(item)
      })
    }
  })
  return { mapFrequency, dims, timeId };
};

export default crSdnDimConfig
