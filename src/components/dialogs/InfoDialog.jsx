import memoIsShow from '../hoc/memoIsShow';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import { RowFlex } from './rows/RowFlex';

const S_CAPTION = {
  color: '#a487d4',
  width: 400,
  paddingLeft: 10,
  lineHeight: 2,
  fontSize: '18px',
  fontWeight: 'bold'
},
S_DESCR = {
  color: 'grey',
  width: 400,
  paddingLeft: 10,
  lineHeight: 1.4,
  fontWeight: 'bold',
  whiteSpace: 'pre'
};

const InfoDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
  const {
    caption,
    descr
  } = data;
  return (
    <ModalDialog
      caption="Information"
      isShow={isShow}
      onClose={onClose}
    >
       <RowFlex>
          <p style={S_CAPTION}>
            {caption}
          </p>
       </RowFlex>
       <RowFlex>
          <p style={S_DESCR}>{descr}</p>
       </RowFlex>
    </ModalDialog>
  );
});

export default InfoDialog
