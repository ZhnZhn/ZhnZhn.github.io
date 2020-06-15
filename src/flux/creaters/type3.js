
import fns from './createrFns'

const { getC, getV } = fns;

const _isFn = fn => typeof fn === 'function';

const createLoadOptions = (props={}, options={}) => {
  const {
          columnName, dataColumn, seriaColumnNames, loadId,
          fnValue, fnItemCaption,
          linkFn, dataSource,
          dfProps
        } = props
      , { one, fromDate, toDate, transform } = options
      , value = getV(one)
      , caption = getC(one)
      , _value = _isFn(fnValue)
            ? fnValue(value)
            : value
      , _itemCaption = _isFn(fnItemCaption)
            ? fnItemCaption(value)
            : void 0
      , _transform = transform
            ? transform.value
            : void 0
      , _subtitle = transform
            ? transform.caption
            : void 0;
  return {
    value : _value,
    transform: _transform,
    title: caption,
    subtitle: _subtitle,
    item: one,
    oneCaption: caption,
    fromDate: fromDate,
    toDate: toDate,
    columnName : columnName,
    dataColumn : dataColumn,
    itemCaption : _itemCaption,
    loadId : loadId,
    linkFn : linkFn,
    seriaColumnNames, dataSource,
    ...dfProps
  }
}

export default createLoadOptions
