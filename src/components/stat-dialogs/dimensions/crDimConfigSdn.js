import {
  crDimItem,
  toFirstUpperCase
} from './dimConfigFn';

const _crSdnOptions = ({ values, id }) =>
 (values || []).map(item =>
    crDimItem(item.text, id, item.id));

const crDimConfigSdn = (variables) => {
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
        options: _crSdnOptions(item)
      })
    }
  })
  return { mapFrequency, dims, timeId };
};

export default crDimConfigSdn
