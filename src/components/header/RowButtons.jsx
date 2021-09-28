import FlatButton from '../zhn-m/FlatButton';

const S_ROW = {
  float: 'right',
  margin: '8px 4px 10px 0'
};


const RowButtons = ({
  btStyle,
  onClose,
  children,
}) => (
 <div style={S_ROW}>
   {children}
   <FlatButton
     style={btStyle}
     caption="Close"
     onClick={onClose}
   />
 </div>
)

export default RowButtons
