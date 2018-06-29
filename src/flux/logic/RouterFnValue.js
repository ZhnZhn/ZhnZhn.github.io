
const RouterFnValue = {
  ROne : (one) => one,

  RTwo : (one, two) => `${two}`,
  ROneTwo : (one, two) => `${one}/${two}`,
  ROneDashTwo : (one, two) => `${one}_${two}`,
  RPrefixOne : (prefix, one) => `${prefix}/${one}`,
  ROneSufix: (sufix, one) => `${one}/${sufix}`,
  RPrefixDashOne : (prefix, one) => `${prefix}_${one}`,
  RPrefixOneTwo : (prefix, one, two) => `${prefix}/${one}_${two}`,
  TOneTwo: (one, two) => ({ one, two }),
  RPrefixOneTwoA : (prefix, one, two) => `${prefix}/${one}_${two}_MRY`,
  RPrefixOneEmptyTwo : (prefix, one, two) => `${prefix}/${two}`,
  RPrefixOneTwoWithoutDash : (prefix, one, two) => `${prefix}/${one}${two}`,
  RPrefixTwoOne : (prefix, one, two) => `${prefix}/${two}_${one}`,

  RPrefixSlashDash: (prefix, ...arr) => `${prefix}/${arr.join('_')}`,

  ROecd: (one, two, three) => {
    if (three) {
      return `OECD/${two}_${one}_${three}`;
    } else {
      return `OECD/${two}_${one}`;
    }
  },

  RZillow : (one, two, three) => `ZILLOW/${two}${three}_${one}`,

  RJodiGas : (one, two, three) => `JODI/GAS_${two}${three}_${one}`,
  RJodiOil : (country, product, flow, units) => `JODI/OIL_${product}${flow}${units}_${country}`,
  REiaCoal : (one, two, three) => `EIA/COAL_${two}_${one}_${three}`,

  RFutures : (prefix, item, month, year) => `${prefix}/${item}${month}${year}`,
  RWikiFutures : (exchange, item, type) => `CHRIS/${exchange}_${item}${type}`,

  RPrefixInseeTwoM : (prefix, group, item) => `INSEE/${prefix}_${item}_M`,
  RInseeTwoM : (group, item) => `INSEE/${group}_${item}_M`,
  RPrefixInseeTwoA : (prefix, group, item) => `INSEE/${prefix}_${item}_A`,
  RInsee : (value) => `INSEE/${value}`

};

export default RouterFnValue
