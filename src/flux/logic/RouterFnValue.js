import { crGetRoute } from "../../utils/crRouter";

export const getCrValue = crGetRoute({
  ROne : (one) => one,
  RTwo : (one, two) => `${two}`,
  ROneTwo : (one, two) => `${one}/${two}`,
  RPrefixOne : (prefix, one) => `${prefix}/${one}`,
  RPrefixOneTwo : (prefix, one, two) => `${prefix}/${one}_${two}`,
  RPrefixOneEmptyTwo : (prefix, one, two) => `${prefix}/${two}`,
  RPrefixTwoOne : (prefix, one, two) => `${prefix}/${two}_${one}`
})
