
const _crInpuSelectPlaceholder = (
  item
) => `Default: ${item.c}`;

export const crInputSelectDfProps = (
  options,
  dfItemIndex=0
) => {
  const dfItems = options[dfItemIndex];
  return [
    dfItems,
    _crInpuSelectPlaceholder(dfItems)
  ];
}
