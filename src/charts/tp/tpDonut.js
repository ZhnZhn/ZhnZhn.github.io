import {
  crHeader,
  crRow
} from './tpFn';

const _crDonut = ({
   id,
   value,
   point
 }) => `${crHeader(point.nameFull, id)}
<div class="tp__body">
  ${crRow('Value', value)}
</div>`

export const donutValue = {
  fnTemplate: _crDonut,
  isWithValue: true
}
