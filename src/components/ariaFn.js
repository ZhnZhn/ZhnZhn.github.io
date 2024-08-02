export const crAriaExpandedProps = (
  isExpaned,
  controlsId
) => ({
  "aria-expanded": isExpaned,
  "aria-controls": isExpaned
     ? controlsId
     : void 0
})

export const crAriaComboboxProps = (
  labelId
) => ({
  role: "combobox",
  "aria-autocomplete": "list",
  "aria-labelledby": labelId
})
