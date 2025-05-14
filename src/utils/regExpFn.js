
export const REG_ONE_OR_MORE_BLANKS = / +/g;

export const crRegExpReplacements = (
  objReplacements
) => new RegExp(
  Object.keys(objReplacements).join("|"),
  "g"
)
