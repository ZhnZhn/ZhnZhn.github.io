import { RowFlexEnd } from '../dialogs/rows/RowFlex';
import Button from './Button';

const RowButtons = ({
  refBtClose,
  withoutClear,
  caption,
  title,
  onPrimary,
  onClear,
  onClose
}) => (
  <RowFlexEnd>
    <Button.Primary
      caption={caption}
      title={title}
      onClick={onPrimary}
    />
    {!withoutClear &&
      <Button.Clear
         onClick={onClear}
      />
    }
    <Button.Close
       refBt={refBtClose}
       onClick={onClose}
    />
  </RowFlexEnd>
);

export default RowButtons
