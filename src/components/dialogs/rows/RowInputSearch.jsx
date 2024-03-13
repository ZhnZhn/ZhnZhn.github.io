import { SpanInputLabel } from '../../zhn/SpanToken';
import InputSearch from '../../zhn-search/InputSearch';
import crRowProps from './crRowProps';

import crRowLabelStyle from './crRowLabelStyle';
import { RowFlex } from './RowFlex';

const RowInputSearch = (props) => {
  const [
    inputProps,
    caption
  ] = crRowProps(props);

  return (
    <RowFlex>
      <SpanInputLabel style={crRowLabelStyle(props)}>
         {caption}
      </SpanInputLabel>
      <InputSearch {...inputProps} />
    </RowFlex>
  );
};


export default RowInputSearch
