import { COLOR_DATE } from '../../constants/Color';
import { toNumberFormatAll } from '../ChartFn';

import {
  crHeader,
  crRow
} from './tpFn';

const _crTreeMap = ({
  id,
  point
}) => {
  const {
    title,
    label,
    value,
    percent=''
  } = point
  , _percent = percent ? `(${percent}%)` : ''
  , _value = `${toNumberFormatAll(value)} ${_percent}`;
  return `${crHeader(title, id)}
  <div class="tp_body">
    ${crRow('', label)}
    ${crRow('', _value, { color: COLOR_DATE })}
  </div>
  `;
}

export const treeMapValue = {
  fnTemplate: _crTreeMap
}
