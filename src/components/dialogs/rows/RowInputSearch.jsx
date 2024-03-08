import { SpanInputLabel } from '../../zhn/SpanToken';
import InputSearch from '../../zhn-search/InputSearch';
import crRowProps from './crRowProps';

const RowInputSearch = (props) => {
  const [
    rowStyle,
    labelStyle,
    inputProps,
    caption
  ] = crRowProps(props);

  return (
     <div style={rowStyle}>
        <SpanInputLabel style={labelStyle}>
           {caption}
        </SpanInputLabel>
        <InputSearch {...inputProps} />
    </div>
  );
};


export default RowInputSearch
