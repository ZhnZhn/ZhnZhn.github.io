//import PropTypes from "prop-types";

import { SpanInputLabel } from '../zhn/SpanToken';
import InputSelect from '../zhn-select/InputSelect';

import { RowFlex } from '../dialogs/rows/RowFlex';

const S_CAPTION = {
  width: 120
};

const RowInputSelect = ({
  caption,
  options,
  onSelect
}) => (
  <RowFlex>
     <SpanInputLabel style={S_CAPTION}>
       {caption}
     </SpanInputLabel>
     <InputSelect
        width="250"
        options={options}
        onSelect={onSelect}
     />
  </RowFlex>
);

/*
RowInputSelect.propTypes = {
  caption: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func
}
*/

export default RowInputSelect
