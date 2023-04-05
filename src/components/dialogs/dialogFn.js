
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
