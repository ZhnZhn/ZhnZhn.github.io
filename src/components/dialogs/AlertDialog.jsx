//import PropTypes from "prop-types";

import ModalDialog from '../zhn-moleculs/ModalDialog';
import crModalDialog from './fns/crModalDialog'

const CL_ELL =  'ellipsis';

const S = {
  ROW_CAPTION: {
    display: 'flex',
    margin: 5,
    lineHeight: 2,
    fontSize: '18px',
    fontWeight : 'bold'
  },
  CAPTION: {
    display: 'inline-block',
    color: '#f44336',
    paddingLeft: 8,
    paddingRight: 10
  },
  ITEM_ID: {
    color: '#a487d4',
    width: 140
  },
  DESCR: {
    color: 'gray',
    paddingLeft: 12,
    paddingRight: 8,
    lineHeight: 1.4,
    fontWeight: 'bold',
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  }
};

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

const AlertDialog = crModalDialog(({ isShow, data, onClose }) => {
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
        <div style={S.ROW_CAPTION}>
           <span style={S.CAPTION}>
             {_caption}
           </span>
           <span
             className={CL_ELL}
             style={S.ITEM_ID}
             title={alertItemId}
           >
             {alertItemId}
           </span>
        </div>
        <p style={S.DESCR}>
          {alertDescr}
        </p>
     </ModalDialog>
   );
})

export default AlertDialog
