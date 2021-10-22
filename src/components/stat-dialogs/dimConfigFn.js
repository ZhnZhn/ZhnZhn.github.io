
export const crDimItem = (caption, sliceId, value) => ({
  caption,
  slice: { [sliceId]: value }
});

export const toFirstUpperCase = str => str
  ? str.charAt(0).toUpperCase() + str.substring(1)
  : '';
