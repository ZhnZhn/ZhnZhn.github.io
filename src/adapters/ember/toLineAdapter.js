import { crAdapterType1 } from '../crAdapterType1';
import crTsFromData from '../crTsFromData';

const crData = (
  json
) => crTsFromData(json)
, toLineAdapter = crAdapterType1({ crData });

export default toLineAdapter
