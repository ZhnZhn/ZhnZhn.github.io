import A from '../zhn/A';

const S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    paddingRight: 8,
    paddingBottom: 6,
    fontWeight: 'bold'
  }
};

const RowPlusMinus = ({ is, styleCaption, caption, onMinus, onPlus }) => (
  <div>
    <span style={{...S.CAPTION, ...styleCaption }}>
       {caption}
    </span>
    {
      is ? <A.SvgMinus onClick={onMinus} />
         : <A.SvgPlus onClick={onPlus} />
    }
  </div>
);

export default RowPlusMinus
