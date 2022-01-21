import fn from './tpFn';
import { YEAR_COLOR } from './Colors';

const {
  crHeader, crRow,
  toNumberFormatAll
} = fn;

const _crTreeMap = function({ id, point }){
  const { title, label, value, percent='' } = point
  , _percent = percent ? `(${percent}%)` : ''
  , _value = `${toNumberFormatAll(value)} ${_percent}`;
  return `${crHeader(title, id)}
  <div class="tp_body">
    ${crRow('', label)}
    ${crRow('', _value, { color: YEAR_COLOR })}
  </div>
  `;
}

const tpTreeMap = {
  value: {
    fnTemplate: _crTreeMap
  }
};

export default tpTreeMap
