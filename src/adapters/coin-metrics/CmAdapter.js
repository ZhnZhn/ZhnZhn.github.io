import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'

const {
  crData,
  crTitle,
  crConfOption
} = fnAdapter
, _assign = Object.assign;

const trOption = (option, json) =>
  _assign(option, crTitle(option, json));

const CmAdapter = crAdapterType1({
  crData, crConfOption, trOption
});

export default CmAdapter
