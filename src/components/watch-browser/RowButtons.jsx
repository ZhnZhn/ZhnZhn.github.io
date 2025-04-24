import { RowFlexEnd } from '../dialogs/rows/RowFlex';
import FlatButton from '../zhn-m/FlatButton';

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
    <FlatButton      
       caption={caption}
       title={title}
       onClick={onPrimary}
    />
    {!withoutClear && <FlatButton
       caption="Clear"
       title="Clear Input"
       onClick={onClear}
    />}
    <FlatButton
       refBt={refBtClose}
       caption="Close"
       title="Close Dialog"
       onClick={onClose}
    />
  </RowFlexEnd>
);

export default RowButtons
