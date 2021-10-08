import ModalDialog from '../zhn-moleculs/ModalDialog'
import STYLE from '../styles/DialogStyles'
import crModalDialog from './fns/crModalDialog'

const S_CAPTION = {
  width : 400,
  paddingLeft : 10,
  color : '#a487d4',
  lineHeight : 2,
  fontSize : '18px',
  fontWeight : 'bold'
},
S_DESCR = {
  color : 'gray',
  width : 400,
  paddingLeft : 10,
  lineHeight : 1.4,
  fontWeight : 'bold',
  whiteSpace : 'pre'
};


const InfoDialog = crModalDialog(({
  isShow,
  data,
  onClose
}) => {
  const { caption, descr } = data;
  return (
    <ModalDialog
      caption="Information"
      isShow={isShow}
      onClose={onClose}
    >
       <div style={STYLE.ROW}>
          <p style={S_CAPTION}>
            {caption}
          </p>
       </div>
       <div style={STYLE.ROW}>
          <p style={S_DESCR}>{descr}</p>
       </div>
    </ModalDialog>
  );
});

export default InfoDialog
