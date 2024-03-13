import FlatButton from '../zhn-m/FlatButton';
import { RowFlexEnd } from '../dialogs/rows/RowFlex';

const S_ROW = {
  marginRight: 0
};

const RowButtons = ({
  style,
  children,
  setRefFocusLast,
  btStyle,
  onClose
}) => (
 <RowFlexEnd style={{...S_ROW, ...style}}>
   {children}
   <FlatButton
     refBt={setRefFocusLast}
     style={btStyle}
     caption="Close"
     onClick={onClose}
   />
 </RowFlexEnd>
);

export default RowButtons
