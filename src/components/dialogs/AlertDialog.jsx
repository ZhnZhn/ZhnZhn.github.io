//import PropTypes from "prop-types";
import memoIsShow from '../hoc/memoIsShow';
import ModalDialog from '../zhn-moleculs/ModalDialog';
import EllipsisDiv from '../zhn/EllipsisDiv';

const S_ROW_CAPTION = {
  display: 'flex',
  margin: 5,
  lineHeight: 2,
  fontSize: '18px',
  fontWeight: 'bold'
}
, S_CAPTION = {
  display: 'inline-block',
  color: '#f44336',
  padding: '0 10px 0 8px'
}
, S_ITEM_ID = {
  display: 'inline-block',
  color: '#a487d4',
  width: 140
}
, S_DESCR = {
  color: 'grey',
  padding: '0 8px 0 12px',
  lineHeight: 1.4,
  fontWeight: 'bold',
  whiteSpace: 'pre-line',
  wordWrap: 'break-word'
}


/*
AlertDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    alertCaption: PropTypes.string,
    alertItemId: PropTypes.string,
    alertDescr: PropTypes.string
  }),
  onClose: PropTypes.func
}
*/

const AlertDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
   const {
     alertCaption='Item',
     alertItemId='',
     alertDescr
   } = data
   , _caption = alertCaption + ': ';
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
           <EllipsisDiv
             style={S_ITEM_ID}
             text={alertItemId}
             title={alertItemId}
           />
        </div>
        <p style={S_DESCR}>
          {alertDescr}
        </p>
     </ModalDialog>
   );
})

export default AlertDialog
