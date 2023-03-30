import InputSelect from '../../zhn-select/InputSelect';
import crRowProps from './crRowProps';

const RowInputSelect = (props) => {
  const [
    rowStyle,
    labelStyle,
    selectProps,
    caption,
    title
  ] = crRowProps(props);

  return (
     <div style={rowStyle}>
        <span style={labelStyle} title={title}>
           {caption}
        </span>
        <InputSelect {...selectProps} />
    </div>
  );
};


export default RowInputSelect
