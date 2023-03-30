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
        <span style={labelStyle}>
           {caption}
        </span>
        <InputSearch {...inputProps} />
    </div>
  );
};


export default RowInputSearch
