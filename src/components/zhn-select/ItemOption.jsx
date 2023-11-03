import { CL_ITEM_OPTION } from './CL';

const ItemOption = ({
  item,
  propCaption
}) => (
  <div className={CL_ITEM_OPTION}>
    {(item || {})[propCaption]}
  </div>
);

export default ItemOption
