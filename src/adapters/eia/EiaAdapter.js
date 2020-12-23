import crAdapterType1 from '../crAdapterType1';
import fnAdapter from './fnAdapter';

const {
  crTitle,
  crData,
  crConfOption
} = fnAdapter
, _assign = Object.assign;

const trOption = option =>
  _assign(option, crTitle(option));

const EiaAdapter = crAdapterType1({
  crData, crConfOption, trOption
});

export default EiaAdapter
