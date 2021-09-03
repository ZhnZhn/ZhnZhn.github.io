import { memo, useContext, useMemo } from 'react'

import BrowserContext from './BrowserContext';
import MenuItem from './MenuItem';

const DF_MODEL = [];

const useModel = model => {
  const isMenuItem  = useContext(BrowserContext)
  return useMemo(() => isMenuItem
    ? model.filter(isMenuItem)
    : model
  , [isMenuItem, model]);
};

const MenuList = memo(({
  refFirstItem,
  model=DF_MODEL,
  fOnClickItem
}) => {
  const _model = useModel(model);
  return (
    <div>
      {_model.map((item, index) => (
         <MenuItem
           innerRef={index === 0 ? refFirstItem : void 0}
           key={item.id}
           item={item}
           onClick={fOnClickItem(item)}
         />
        )
      )}
    </div>
  );
})

/*
MenuList.propTypes = {
  refFirstItem: PropTypes.shape({
    current: PropTypes.object
  }),
  model: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string
  }))
  fOnClickItem: PropTypes.func
}
*/

export default MenuList
