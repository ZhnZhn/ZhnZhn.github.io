import A from '../zhn/A';

const S_CAPTION = {
  display: 'inline-block',
  color: 'black',
  padding: '0 8px 6px 0',
  fontWeight: 'bold'
};

const RowPlusMinus = ({
  is,
  styleCaption,
  caption,
  onMinus,
  onPlus
}) => (
  <div>
    <span style={{...S_CAPTION, ...styleCaption}}>
       {caption}
    </span>
    {
      is ? <A.SvgMinus onClick={onMinus} />
         : <A.SvgPlus onClick={onPlus} />
    }
  </div>
);

export default RowPlusMinus
