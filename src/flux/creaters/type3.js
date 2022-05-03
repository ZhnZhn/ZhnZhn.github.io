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
    columnName,
    dataColumn,
    seriaColumnNames,
    loadId,
    fnValue,
    fnItemCaption,
    linkFn,
    dataSource,
    dfProps
  } = props || {}
  , {
    one,
    fromDate,
    toDate,
    transform,
    chartType,
    seriaColor,
    seriaWidth,
  } = options || {}
  , { value:seriaType } = chartType || {}
  , value = getV(one)
  , caption = getC(one)
  , _value = isFn(fnValue)
      ? fnValue(value)
      : value
  , _itemCaption = isFn(fnItemCaption)
      ? fnItemCaption(value)
      : void 0
  , [_transform, _subtitle] = transform
      ? [transform.value, transform.caption]
      : [];
  return {
    value: _value,
    transform: _transform,
    title: caption,
    subtitle: _subtitle,
    item: one,
    oneCaption: caption,
    itemCaption: _itemCaption,
    fromDate,
    toDate,
    columnName,
    dataColumn,
    loadId,
    linkFn,
    seriaType,
    seriaColor,
    seriaWidth,
    seriaColumnNames,
    dataSource,
    ...dfProps
  };
};

export default createLoadOptions
