const S_CAPTION = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const ItemOption = ({
  item={},
  propCaption
}) => (
  <div style={S_CAPTION}>
    {item[propCaption]}
  </div>
);

export default ItemOption
