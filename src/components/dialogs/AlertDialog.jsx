import {
  S_FLEX,
  S_INLINE
} from '../styleFn';

import memoIsShow from '../hoc/memoIsShow';
import ModalDialog from '../zhn-moleculs/ModalDialog';
import DivEllipsis from '../zhn/DivEllipsis';

const S_ROW_CAPTION = {
  ...S_FLEX,
  margin: 5,
  lineHeight: 2,
  fontSize: '18px',
  fontWeight: 'bold'
}
, S_CAPTION = {
  ...S_INLINE,
  color: '#f44336',
  padding: '0 10px 0 8px',
  whiteSpace: 'nowrap'
}
, S_ITEM_ID = {
  ...S_INLINE,  
  color: '#a487d4',
  width: 190
}
, S_DESCR = {
  color: 'grey',
  padding: '0 8px 0 12px',
  lineHeight: 1.4,
  fontWeight: 'bold',
  whiteSpace: 'pre-line',
  wordWrap: 'break-word'
};

const AlertDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
   const {
     alertCaption='Item',
     alertItemId,
     alertDescr
   } = data
   , _caption = alertItemId
      ? alertCaption + ': '
      : alertCaption;
   return (
     <ModalDialog
       caption="Alert"
       isShow={isShow}
       onClose={onClose}
     >
        <div style={S_ROW_CAPTION}>
           <span style={S_CAPTION}>
             {_caption}
           </span>
           {alertItemId && <DivEllipsis
             style={S_ITEM_ID}
             text={alertItemId}
             title={alertItemId}
           />}
        </div>
        <p style={S_DESCR}>
          {alertDescr}
        </p>
     </ModalDialog>
   );
})

export default AlertDialog
