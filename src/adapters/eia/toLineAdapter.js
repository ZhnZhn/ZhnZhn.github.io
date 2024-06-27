import crAdapterType1 from '../crAdapterType1';
import {
  crTitle,
  crData,
  crConfOption
} from './fnAdapter';

const _assign = Object.assign
, trOption = option => _assign(option, crTitle(option))
, toLineAdapter = crAdapterType1({
  crData,
  crConfOption,
  trOption
});

export default toLineAdapter
