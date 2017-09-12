
import AdapterFn from '../AdapterFn'
import C from './conf'

const fnHm = {

  crAvgPricePoint: item => {
    const { TradeValue, NetWeight } = item
        , _y = (NetWeight && TradeValue != null)
             ? parseFloat((TradeValue/NetWeight).toFixed(2))
             : undefined;
    return {
      y: _y,
      forSort: NetWeight
    };
  },

  fValue(pnValue) {
    switch(pnValue) {
      case C.AVG_PRICE:
        return this.crAvgPricePoint;
      default:
        return item => {
           return {
             y: item[pnValue],
             forSort: item[pnValue]
           };
        };
    }
  },

  fPoint(pnValue) {
    const _crValue = this.fValue(pnValue);
    return item => {
      return {
        isCategory: true,
        x: item.period,
        //x: AdapterFn.ymdToUTC('' + item.period + C.MM_DD),
        ..._crValue(item)
      };
    };
  },

  toArr: (obj) => {
    const arr = [];
    let propName;
    for (propName in obj){
      arr.push(obj[propName])
    }
    return arr.sort();
  },

  toSeriaNames: (hm) => {
    const arr = [];
    //let propName;
    for (let propName in hm){
      if (propName !== C.WORLD) {
        const points = hm[propName];
        arr.push({
          value: points[points.length-1].forSort,
          name: propName
        })
      }
    }
    return arr.sort(AdapterFn.compareByValue).reverse();
  },

  toHmCategories({
    dataset,
    pnCountry='ptTitle',
    pnValue='TradeValue'
  }) {
    const hm = Object.create(null)
        , _category = Object.create(null)
        , _crPoint = this.fPoint(pnValue);

    dataset.forEach(item => {
      const ptTitle = item[pnCountry];
      if (hm[ptTitle] === undefined) {
        hm[ptTitle] = []
      }
      hm[ptTitle].push(_crPoint(item))

      const period = item.period;
      if (_category[period] === undefined) {
        _category[period] = period
      }
    })

    const categories = this.toArr(_category);

    return { hm, categories };
  }

};

export default fnHm
