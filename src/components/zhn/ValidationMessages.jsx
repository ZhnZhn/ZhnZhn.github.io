//import PropTypes from "prop-types";
import { crStepStyle } from '../styleFn';
import ItemStack from './ItemStack';
import StepTitle from './StepTitle';

const MSG_COLOR = "#f44336"
, S_VM = {
  color: MSG_COLOR,
  paddingLeft: 10,
  paddingTop: 4,
  fontWeight: "bold",
  lineHeight: 1.4
}
, S_VM_MSG_NUMBER = crStepStyle(MSG_COLOR);

const _crItem = (
  msg,
  index
) => (
  <StepTitle
    key={msg}
    step={index+1}
    stepStyle={S_VM_MSG_NUMBER}
    title={msg}
  />
);

const ValidationMessages = ({
  validationMessages
}) => (
 <div style={S_VM}>
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
