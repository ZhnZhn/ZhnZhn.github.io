
import CA from '../actions/ComponentActions'
import LocationQuery from './LocationQuery'

const ARR_B = [ 'UN', 'QE', 'FAO' ];
const ARR_C = [
  'SM_WIKI',
  'SM_IEX_CHART_5Y','SM_IEX_CHART_2Y',
  'USAE_BLS_1',
  'BC_HD'
];

const _isQuery = (obj) => obj && obj.v &&
  ARR_C.indexOf(obj.cT) !== -1 ||
  ARR_B.indexOf(obj.bT) !== -1;

const _trSearchToOptions = () => {
  const search = window?.location?.search;
  if (!search || search.length > 120 ){
    return void 0;
  }
  const options = LocationQuery.toOptions(new URLSearchParams(search));
  return _isQuery(options)
    ? options
    : void 0;
};

const LocationSearch = {
  load: () => {
    const options = _trSearchToOptions();
    if (options) {
      CA.showAsk({ options })
    }
  }
}

export default LocationSearch
