export const crInputProps = (
  type = "text",
  spellCheck = false
) => {
  const [
    _autoCorrect,
    _spellCheck
  ] = spellCheck
    ? ["on", "true"]
    : ["off", "false"]
  return {
    type: type,
    autoCapitalize: "off",
    autoComplete: "off",
    autoCorrect: _autoCorrect,
    spellCheck: _spellCheck
  };
}

const _getNumberLength = n => (n+"").length;
export const crInputNumberProps = (
  initialValue,
  min,
  max,
) => ({
  type: "number",
  inputMode: "numeric",
  initValue: initialValue,
  min,
  max,
  maxLength: Math.max(
    _getNumberLength(min),
    _getNumberLength(max)
  )
})
