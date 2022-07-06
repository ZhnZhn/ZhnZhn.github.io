import {
  S_HR,
  getIsValidColor
} from './Input.Style';

const Hr = ({
  isValid
}) => (
  <hr
    style={{
      ...S_HR,
      ...{borderColor: getIsValidColor(isValid)}
    }}
  />
);


export default Hr
