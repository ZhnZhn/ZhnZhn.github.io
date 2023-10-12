import { isCategoryItem } from './ChartOptionsFn';
import { TYPE_T3AB } from './ChartOptionsTypes';

export const crIsId = id => `is${id}Select`;

export const crIsToggleInit = (
  selectProps
) => selectProps
 .reduce((toggleConfig, item) => {
    toggleConfig[crIsId(item.id)] = true
    return toggleConfig;
 }, Object.create(null));

export const getItemValue = (
  item
) => (item || {}).value

const _geSelectPropsCaption = (
  selectProps,
  index
) => selectProps[index].caption;

const _isChartTypeT3AB = (
  chartType
) => chartType && chartType.id === TYPE_T3AB;

const _isItemDf = () => true

const _crMsgs = (
  items,
  selectProps,
  msgOnNotSelected,
  fromIndex,
  isItem = _isItemDf
) => {
  const msgs = [];
  let i = fromIndex;
  for(; i<selectProps.length; i++) {
    if (isItem(i) && !items[i]) {
      msgs.push(msgOnNotSelected(
        _geSelectPropsCaption(selectProps, i))
      )
    }
  }
  return msgs;
}

export const crMsgs = (
  chartType,
  items,
  selectProps,
  msgOnNotSelected
) => {
  if (_isChartTypeT3AB(chartType)) {
    return _crMsgs(
      items,
      selectProps,
      msgOnNotSelected,
      0,
      i => i !== 1
    )
  } else {
    return _crMsgs(
      items,
      selectProps,
      msgOnNotSelected,
      isCategoryItem(chartType) ? 1 : 0
    )
  }
}
