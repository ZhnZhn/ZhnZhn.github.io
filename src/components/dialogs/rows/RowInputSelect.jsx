import InputSelect from '../../zhn-select/InputSelect';
import crRowOptions from './crRowOptions';

const RowInputSelect = (props) => {
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
        <InputSelect {...options} />
    </div>
  );
};


export default RowInputSelect
