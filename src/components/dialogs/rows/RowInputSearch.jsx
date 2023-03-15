import InputSearch from '../../zhn-search/InputSearch';
import crRowOptions from './crRowOptions';

const RowInputSearch = (props) => {
  const [
    rowStyle,
    labelStyle,
    caption,
    options
  ] = crRowOptions(props);

  return (
     <div style={rowStyle}>
        <span style={labelStyle}>
           {caption}
        </span>
        <InputSearch {...options} />
    </div>
  );
};


export default RowInputSearch
