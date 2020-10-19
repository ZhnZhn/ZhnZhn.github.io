import FlatButton from '../zhn-m/FlatButton'

const S = {
  ROW: {
     cursor: 'default',
     float: 'right',
     marginTop: 8,
     marginBottom: 10,
     marginRight: 4
  }
};

const RowButtons = ({ children, btStyle, onClose }) => (
 <div style={S.ROW}>
   {children}
   <FlatButton
     style={btStyle}
     caption="Close"
     onClick={onClose}
   />
 </div>
)

export default RowButtons
