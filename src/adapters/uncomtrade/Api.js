
const C = {
  PERIOD: 5,
  ALL: 'all',
  BU_ALL_PARAMS: 'p=0&max=3000',
  NU_ALL_PARAMS: 'p=0',
  //rg=2 Export
  BU_PREFIX: 'https://comtrade.un.org/api/get?fmt=JSON&head=M&freq=A&px=H4',
  NU_PREFIX: 'https://comtrade.un.org/db/dqBasicQueryResults.aspx?px=H4&y=2017&so=1001',

  DF_RG: 2,
  DF_MEASURE: 'NetWeight'
};


const _crPeriod = (period) => {
  const yearNow = (new Date()).getUTCFullYear()
  , arr = [];
  for(let i=1; i<=period; i++) {
    arr.push(yearNow-i)
  }
  return arr.reverse().join(',');
};

const UnComtradeApi = {
  getRequestUrl(option){
    const { one=C.ALL, two, rg=2 } = option
    , _ps = _crPeriod(C.PERIOD);
    if (one !== C.ALL) {
      option.nativeHref = `${C.NU_PREFIX}&r=${one}&cc=${two}`;
      return `${C.BU_PREFIX}&rg=${rg}&r=${one}&cc=${two}&ps=${_ps}`;
    } else {
      option.nativeHref = `${C.NU_PREFIX}&${C.NU_ALL_PARAMS}&r=${one}&cc=${two}`;
      return `${C.BU_PREFIX}&${C.BU_ALL_PARAMS}&rg=${rg}&r=${one}&cc=${two}&ps=${_ps}`;
    }
  },

  checkResponse(json){
    return true;
  },

  addPropsTo(option){
    const {
            one, v,
            rg=C.DF_RG,
            measure=C.DF_MEASURE
          } = option;

    if (!one) {
      const arr = v.substring(3).split('_')
      Object.assign(option, {
        one: arr[0],
        two: arr[1]
      })
    }

    Object.assign(option, { rg, measure })
  }
};

export default UnComtradeApi
