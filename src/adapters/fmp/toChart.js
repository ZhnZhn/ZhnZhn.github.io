import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'

const {
  crData,
  addConfOption,
  crCaption
} = fnAdapter
, _assign = Object.assign;

const trOption = option =>
  _assign(option, crCaption(option));

const toChart = crAdapterType1({
  crData, addConfOption, trOption
});

export default toChart
