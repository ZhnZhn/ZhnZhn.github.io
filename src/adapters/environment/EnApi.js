import { getValues } from '../AdapterFn';
import { crProviderApi } from '../ApiFn';

const DATA_URL = './data/environment';

const _crLineUrl = (
  option
) => `${DATA_URL}/${getValues(option)[0]}.json`;

const getRequestUrl = (option) => _crLineUrl(option)
, EnApi = crProviderApi(getRequestUrl);

export default EnApi
