
const URL_ID_COUNTRY = './data/eurostat/id-country.json';

let hmIdCountry = {};
let isHmFetched = false;

export const fetchHmIdCountry = () => isHmFetched
  ? Promise.resolve(hmIdCountry)
  : fetch(URL_ID_COUNTRY)
      .then(res => res.json())
      .then(json => {
         hmIdCountry = json.hm;
         isHmFetched = true;
         return hmIdCountry;
      })
      .catch((err) => { return hmIdCountry; });

export const getCountryById = id => hmIdCountry[id] || id;
