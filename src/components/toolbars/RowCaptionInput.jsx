import A from '../zhn/A'

const S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    width: 48,
    fontWeight : 'bold',
  },
  INPUT_TEXT: {
    width: 56,
    marginRight: 12
  }
};

const RowCaptionInput = ({
  caption,
  forwardRef, initValue,
  maxLength=3,
  onAdd
}) => (
  <div>
    <span style={S.CAPTION}>{caption}</span>
    <A.InputText
       ref={forwardRef}
       type="number"
       style={S.INPUT_TEXT}
       initValue={initValue}
       maxLength={maxLength}
       onEnter={onAdd}
    />
    <A.SvgPlus onClick={onAdd} />
  </div>
);

export default RowCaptionInput
