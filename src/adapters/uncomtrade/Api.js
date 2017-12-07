
const C = {
  ALL: 'all',
  BU_ALL_PARAMS: 'p=0&max=3000',
  NU_ALL_PARAMS: 'p=0',
  //rg=2 Export
  BU_PREFIX: 'https://comtrade.un.org/api/get?fmt=JSON&head=M&freq=A&px=H4&ps=recent',
  //BASE_URL: 'https://comtrade.un.org/api/get?fmt=JSON&r=68&freq=A&px=H4&cc=100850&rg=2&ps=2010'
  NU_PREFIX: 'https://comtrade.un.org/db/dqBasicQueryResults.aspx?px=H4&y=2016&so=1001',

  DF_RG: 2,
  DF_MEASURE: 'NetWeight'
};

const UnComtradeApi = {
  getRequestUrl(option){
    const { one=C.ALL, two, rg=2 } = option;
    if (one !== C.ALL) {
      option.nativeHref = `${C.NU_PREFIX}&r=${one}&cc=${two}`;
      return `${C.BU_PREFIX}&rg=${rg}&r=${one}&cc=${two}`;
    } else {
      option.nativeHref = `${C.NU_PREFIX}&${C.NU_ALL_PARAMS}&r=${one}&cc=${two}`;
      return `${C.BU_PREFIX}&${C.BU_ALL_PARAMS}&rg=${rg}&r=${one}&cc=${two}`;
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
