import crAdapterType1 from '../crAdapterType1';
import fnAdapter from './fnAdapter';

const { crData, crConfOption } = fnAdapter;

const crKey = ({ value }) => value;

const BeaAdapter = crAdapterType1({
   crKey, crData, crConfOption
});

export default BeaAdapter
