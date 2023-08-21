import {
  S_FLEX_ROW_END
} from '../styles/GeneralStyles';
import FlatButton from '../zhn-m/FlatButton';

const S_ROW = {
  ...S_FLEX_ROW_END,
  marginTop: 8,
  marginBottom: 10
};

const RowButtons = ({
  style,
  children,
  setRefFocusLast,
  btStyle,
  onClose
}) => (
 <div style={{...S_ROW, ...style}}>
   {children}
   <FlatButton
     refBt={setRefFocusLast}
     style={btStyle}
     caption="Close"
     onClick={onClose}
   />
 </div>
);

export default RowButtons
