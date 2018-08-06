import fn from './tpFn'

const { crHeader, crRow } = fn;

const _crDonut = function({ id, value, point }){
  return `${crHeader(point.nameFull, id)}
  <div class="tp__body">
    ${crRow('Value', value)}
  </div>`;
}

const tpDonut = {
  value: {
    fnTemplate: _crDonut,
    isWithValue: true
  }
};

export default tpDonut
