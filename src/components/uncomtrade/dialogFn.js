import {
  getCaption
} from '../../utils/itemFn';

export const crInputSelectDfProps = (
  options,
  dfItemIndex=0
) => {
  const dfItem = options[dfItemIndex];
  return [
    dfItem,
    `Default: ${getCaption(dfItem)}`
  ];
}
