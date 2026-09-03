import { getValues } from '../AdapterFn';
import { crProviderApi } from '../ApiFn';

const DATA_URL = './data/imf/weo-commodity';

const _crDataUrl = dfFn => {
  const suffix = dfFn === "CP"
    ? "prices"
    : "price-indices";
  return `${DATA_URL}-${suffix}`;
};

const _crLineUrl = (
  option,
  dataUrl
) => `${dataUrl}/${getValues(option)[0]}.json`;

const getRequestUrl = (
  option
) => _crLineUrl(
  option, 
  _crDataUrl(option.dfFn)
)
, ImfTsApi = crProviderApi(
  getRequestUrl
);

export default ImfTsApi
