import { setDataSourceTo } from '../../charts/configBuilderFn';
import crAdapterType1 from '../crAdapterType1';
import crFromYearData from '../crFromYearData';
import { crAdapterRouter } from '../crAdapterRouter';

const toLineAdapter = crAdapterType1({
  crData: crFromYearData,
  addToConfig: (config, json) => setDataSourceTo(config, json.source)
})
, EnAdapter = crAdapterRouter({ 
  getRoute: () => toLineAdapter
})

export default EnAdapter
