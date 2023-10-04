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

export const crMsgs = (
  chartType,
  items,
  selectProps,
  msgOnNotSelected
) => {
  const msgs = [];
  if (chartType.id === TYPE_T3AB) {
    if (!items[0]) {
      msgs.push(msgOnNotSelected(
        _geSelectPropsCaption(selectProps, 0)
      ))
    }
  } else {
    let i = isCategoryItem(chartType) ? 1 : 0;
    for(; i<selectProps.length; i++) {
      if (!items[i]) {
        msgs.push(msgOnNotSelected(
          _geSelectPropsCaption(selectProps, i))
        )
      }
    }
  }
  return msgs;
}
