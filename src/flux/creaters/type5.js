import { isFunction } from '../../utils/is'

const _crDefault = (props, options) => {
  const { fnValue, loadId } = props
      , { one, two, three, fromDate, toDate } = options
      , _value = isFunction(fnValue)
           ? fnValue(one.value, two.value)
           : undefined
  return {
    value : _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn : (three) ? three.value : 1,
    loadId : loadId,
    title : `${one.caption}:${two.caption}`,
    subtitle : three.caption
  }
}

const _crTreeItem = (props, options) => {
  const { fnValue, dataColumn, loadId } = props
      , { one, two, three, fromDate, toDate } = options
      , _value = isFunction(fnValue)
           ? fnValue(one.value, three.value)
           : undefined
  return {
    value : _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn : dataColumn,
    loadId : loadId,
    title : `${one.caption}:${two.caption}`,
    subtitle : three.caption
  };
};

const _crPlusTreeItem = (props, options) => {
  const { fnValue, dataColumn, loadId } = props
      , { one, two, three, fromDate, toDate } = options
      , _value = isFunction(fnValue)
           ? fnValue(one.value, two.value, three.value)
           : undefined
  return {
    value : _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn : dataColumn,
    loadId : loadId,
    title : `${two.caption} : ${three.caption}`,
    subtitle : one.caption
  }
};

const _rFn = {
  DEFAULT : _crDefault,
  TreeItem : _crTreeItem,
  PlusTreeItem : _crPlusTreeItem
}

const createLoadOptions = (props={}, options={}) => {
  const { fnValueType } = props
      , _createLoadOption = _rFn[fnValueType]
  if (isFunction(_createLoadOption)){
    return _createLoadOption(props, options);
  } else {
    return _rFn.DEFAULT(props, options);
  }
};

export default createLoadOptions
