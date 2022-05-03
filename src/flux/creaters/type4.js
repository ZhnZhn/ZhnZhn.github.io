import {
  isFn,
  getC,
  getV
} from './createrFns';

const createLoadOptions = (
  props,
  options
) => {
  const {
    fnValue,
    dataColumn,
    loadId,
    dataSource,
    isPremium,
    linkFn,
    dfProps
  } = props || {}
  , {
    one,
    two,
    three,
    fromDate,
    toDate,
    hasSecondYAxis
  } = options || {}
  , _oneV = getV(one)
  , _oneC = getC(one)
  , _twoV = getV(two)
  , _twoC = getC(two)
  , _threeV = getV(three)
  , _threeC = getC(three)
  , _value = isFn(fnValue)
       ? fnValue(_oneV, _twoV)
       : _oneV;

  return {
     ...dfProps,
     value: _value,
     title: _oneC,
     subtitle: _twoC,
     oneCaption: _oneC,
     twoCaption: _twoC,
     threeCaption: _threeC,
     one: _oneV,
     two: _twoV,
     three: _threeV,
     items: [one, two, three || {}],
     fromDate,
     toDate,
     dataColumn,
     loadId,
     isPremium,
     dataSource,
     hasSecondYAxis,
     linkFn
  };
};

export default createLoadOptions
