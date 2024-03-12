import { crStepStyle } from '../styleFn';
import StepTitles from './StepTitles';

const MSG_COLOR = "#f44336"
, S_VM = {
  color: MSG_COLOR,
  paddingLeft: 10,
  paddingTop: 4,
  fontWeight: "bold",
  lineHeight: 1.4
}
, S_VM_MSG_NUMBER = crStepStyle(MSG_COLOR);

const ValidationMessages = ({
  validationMessages
}) => (
  <StepTitles
    style={S_VM}
    stepStyle={S_VM_MSG_NUMBER}
    titles={validationMessages}
  />
);

export default ValidationMessages
