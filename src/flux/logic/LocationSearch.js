import {
  showAsk
} from '../actions/ComponentActions';
import LocationQuery from './LocationQuery';

const { crOptions } = LocationQuery;

const ARR_B = [
  'UN',
  'QE',
  'FAO'
];
const ARR_C = [
  'USAE_BLS_1',
  'BC_HD'
];

const _isArrInclude = (
  arr,
  value
) => arr.indexOf(value) !== -1;

const _isQuery = (obj) => obj && obj.v
 && _isArrInclude(ARR_C, obj.cT)
 || _isArrInclude(ARR_B, obj.bT)

const _trSearchToOptions = () => {
  const search = window?.location?.search;
  if (!search || search.length > 120){
    return;
  }
  const options = crOptions(new URLSearchParams(search));
  return _isQuery(options)
    ? options
    : void 0;
};

export const showAskDialogIf = () => {
  const options = _trSearchToOptions();
  if (options) {
    showAsk({ options })
  }
}
