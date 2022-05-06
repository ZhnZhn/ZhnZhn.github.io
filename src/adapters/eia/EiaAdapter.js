import crAdapterType1 from '../crAdapterType1';
import {
  crTitle,
  crData,
  crConfOption
} from './fnAdapter';

const _assign = Object.assign;

const trOption = option =>
  _assign(option, crTitle(option));

const EiaAdapter = crAdapterType1({
  crData,
  crConfOption,
  trOption
});

export default EiaAdapter
