export { toUpperCaseFirst } from '../../../utils/toUpperCaseFirst'

export const crDimItem = (
  caption,
  sliceId,
  value
) => ({
  caption,
  slice: { [sliceId]: value }
})
