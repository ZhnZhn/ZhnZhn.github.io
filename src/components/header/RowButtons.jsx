import FlatButton from '../zhn-m/FlatButton';
import { RowFlexReverseStart } from '../dialogs/rows/RowFlex';

const S_ROW = {
  paddingRight: 0
};

const RowButtons = ({
  style,
  children,
  setRefFocusLast,
  btStyle,
  onClose
}) => (
 <RowFlexReverseStart style={{...S_ROW, ...style}}>
   {children}
   <FlatButton
     refBt={setRefFocusLast}
     style={btStyle}
     caption="Close"
     onClick={onClose}
   />
 </RowFlexReverseStart>
);

export default RowButtons
