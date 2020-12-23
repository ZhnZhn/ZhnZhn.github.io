import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'

const { crData, addConfOption } = fnAdapter;

const OnsAdapter = crAdapterType1({
  crData, addConfOption
});

export default OnsAdapter
