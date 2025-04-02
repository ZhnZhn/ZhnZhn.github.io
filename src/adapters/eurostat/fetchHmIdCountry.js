import { fetchJsonHm } from '../../utils/fnFetch';
import { fGetLazyValue } from '../../utils/fGetLazyValue';

const URL_ID_COUNTRY = './data/eurostat/id-country.json';
const _fetchHmIdCountry = () => fetchJsonHm(URL_ID_COUNTRY);

export const getAsyncHmIdCountry = fGetLazyValue(_fetchHmIdCountry, true)
export const getCountryById = id => (getAsyncHmIdCountry(true) || {})[id] || id
