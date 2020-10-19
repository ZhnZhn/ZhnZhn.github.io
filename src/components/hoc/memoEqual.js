import { memo } from 'react'

const DF_ARE_EQUAL_PROPS = () => {};

const memoEqual = (
  Element,
  areEqualProps=DF_ARE_EQUAL_PROPS
) => memo(Element, areEqualProps);

export default memoEqual
