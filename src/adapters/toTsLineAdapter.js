import { setDataSourceTo } from '../charts/configBuilderFn';

import { crAdapterGetRoute } from './crAdapterRouter';
import { crAdapterType1 } from './crAdapterType1';
import crTsFromData from './crTsFromData';

const _fToTsLineAdapter = (
  addToConfig
) => crAdapterType1({
  crData: crTsFromData,
  addToConfig
})

export const toTsLineAdapter = _fToTsLineAdapter()

const _toTsLineAdapter = _fToTsLineAdapter(
  (config, json) => setDataSourceTo(config, json.source)
);

export const toRouteTsLineAdapter = crAdapterGetRoute(
  () => _toTsLineAdapter
)
