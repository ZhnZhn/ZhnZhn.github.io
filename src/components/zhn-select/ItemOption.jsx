import {
  S_ELLIPSIS
} from '../styles/GeneralStyles';

const S_CAPTION = {
  width: '100%',
  ...S_ELLIPSIS
};

const ItemOption = ({
  item,
  propCaption
}) => (
  <div style={S_CAPTION}>
    {(item || {})[propCaption]}
  </div>
);

export default ItemOption
