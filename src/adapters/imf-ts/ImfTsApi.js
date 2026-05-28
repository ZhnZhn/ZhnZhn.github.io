import {
  getValues,
  fCheckResponse
} from '../AdapterFn';

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

const ImfTsApi = {
  getRequestUrl(option){
    return _crLineUrl(option, _crDataUrl(option.dfFn));
  },
  checkResponse: fCheckResponse()
};

export default ImfTsApi
