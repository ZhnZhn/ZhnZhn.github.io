//import PropTypes from "prop-types";
import ItemStack from './ItemStack';

import STYLE from '../styles/DialogStyles';

const _crItem = (msg, index) => (
  <div key={msg}>
    <span style={STYLE.VM_MSG_NUMBER}>{index+1}</span>
    <span style={STYLE.VM_MSG}>{msg}</span>
  </div>
);

const ValidationMessages = ({
  validationMessages
}) => (
 <div style={STYLE.VM_CONT}>
   <ItemStack
     items={validationMessages}
     crItem={_crItem}
   />
 </div>
);


/*
ValidationMessages.propTypes = {
  validationMessages : PropTypes.arrayOf(PropTypes.shape({
    msg: PropTypes.string
  }))
}
*/

export default ValidationMessages
