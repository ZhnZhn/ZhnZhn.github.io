
import fns from './createrFns'

const { getC, getV } = fns;

const _isFn = fn => typeof fn === 'function';

const createLoadOptions = (props={}, options={}) => {
  const {
          fnValue, dataColumn, loadId, dataSource,
          isPremium, linkFn, dfProps={}
        } = props
      , {
          one, two, three={},
          fromDate, toDate,
          hasSecondYAxis
        } = options
      , _oneV = getV(one)
      , _oneC = getC(one)
      , _twoV = getV(two)
      , _twoC = getC(two)
      , _threeV = getV(three)
      , _threeC = getC(three)
      , _value = _isFn(fnValue)
           ? fnValue(_oneV, _twoV)
           : _oneV;

  return {
       ...dfProps,
       value: _value,
       fromDate: fromDate,
       toDate: toDate,
       dataColumn: dataColumn,
       loadId: loadId,
       title: _oneC,
       subtitle: _twoC,
       isPremium: isPremium,
       dataSource: dataSource,
       hasSecondYAxis: hasSecondYAxis,
       linkFn: linkFn,
       oneCaption: _oneC,
       twoCaption: _twoC,
       threeCaption: _threeC,
       one: _oneV,
       two: _twoV,
       three: _threeV,
       items: [ one, two, three ]
    }
}

export default createLoadOptions
