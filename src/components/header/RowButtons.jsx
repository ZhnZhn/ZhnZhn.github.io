import FlatButton from '../zhn-m/FlatButton';

const S_ROW = {
  float: 'right',
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
