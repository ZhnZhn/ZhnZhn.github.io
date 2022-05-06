import crAdapterType1 from '../crAdapterType1';
import {
  _assign,
  crData,
  addConfOption,
  crCaption
} from './fnAdapter';

const trOption = option =>
  _assign(option, crCaption(option));

const toChart = crAdapterType1({
  crData,
  addConfOption,
  trOption
});

export default toChart
