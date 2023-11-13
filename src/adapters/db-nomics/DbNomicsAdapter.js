import crAdapterType1 from '../crAdapterType1';
import {
  assign,
  crData,
  crTitle,
  crConfOption
} from './fnAdapter';

const trOption = (
  option,
  json
) => {
   assign(option, crTitle(option, json))
};

const DbNomicsAdapter = crAdapterType1({
  crData,
  crConfOption,
  trOption
});

export default DbNomicsAdapter
