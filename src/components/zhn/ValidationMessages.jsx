import { COLOR_RED } from '../../constants/Color';

import StepTitles from './StepTitles';

const S_VM = {
  color: COLOR_RED,
  paddingLeft: 10,
  paddingTop: 4,
  fontWeight: "bold",
  lineHeight: 1.4
}

const ValidationMessages = ({
  validationMessages
}) => (
  <StepTitles
    style={S_VM}
    titles={validationMessages}
  />
);

export default ValidationMessages
