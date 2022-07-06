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
  btStyle,
  onClose,
  children,
}) => (
 <div style={{...S_ROW, ...style}}>
   {children}
   <FlatButton
     style={btStyle}
     caption="Close"
     onClick={onClose}
   />
 </div>
);

export default RowButtons
