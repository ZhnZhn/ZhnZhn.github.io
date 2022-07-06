import {
  S_FLEX_ROW_END
} from '../styles/GeneralStyles';

import Button from './Button';

const S_COMMAND_DIV = {
  ...S_FLEX_ROW_END,
  margin: '8px 4px 10px 0'
}

const RowButtons = ({
  Primary,
  withoutClear,
  onClear,
  onClose
}) => (
  <div style={S_COMMAND_DIV}>
    {Primary}
    {!withoutClear &&
      <Button.Clear
         onClick={onClear}
      />
    }
    <Button.Close
       onClick={onClose}
    />
  </div>
);

export default RowButtons
