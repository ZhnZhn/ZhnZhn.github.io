import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'

const { crData, crConfOption } = fnAdapter;

const BlsAdapter = crAdapterType1({
  crData, crConfOption
});

export default BlsAdapter
