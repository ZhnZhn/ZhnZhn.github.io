import { crGetRoute } from "../../utils/crRouter";

export const getCrValue = crGetRoute({
  ROne : (one) => one,
  RPrefixOne : (prefix, one) => `${prefix}/${one}`,
  RPrefixOneTwo : (prefix, one, two) => `${prefix}/${one}_${two}`
})
