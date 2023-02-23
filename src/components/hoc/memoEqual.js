import { memo } from '../uiApi';

const DF_ARE_PROPS_EQUAL = () => true;

const memoEqual = (
  Element,
  arePropsEqual=DF_ARE_PROPS_EQUAL
) => memo(Element, arePropsEqual);

export default memoEqual
