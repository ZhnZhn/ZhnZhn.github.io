"use strict";

exports.__esModule = true;
exports.getCountryById = exports.fetchHmIdCountry = void 0;
const URL_ID_COUNTRY = './data/eurostat/id-country.json';
let hmIdCountry = {};
let isHmFetched = false;
const fetchHmIdCountry = () => isHmFetched ? Promise.resolve(hmIdCountry) : fetch(URL_ID_COUNTRY).then(res => res.json()).then(json => {
  hmIdCountry = json.hm;
  isHmFetched = true;
  return hmIdCountry;
}).catch(err => {
  return hmIdCountry;
});
exports.fetchHmIdCountry = fetchHmIdCountry;
const getCountryById = id => hmIdCountry[id] || id;
exports.getCountryById = getCountryById;
//# sourceMappingURL=fetchHmIdCountry.js.map