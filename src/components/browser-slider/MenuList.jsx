import { memo } from 'react'

import MenuItem from './MenuItem'

const MenuList = memo(({
  refFirstItem,
  model=[],
  fOnClickItem
}) => (
 <div>
  {model.map((item, index) => (
     <MenuItem
       innerRef={index === 0 ? refFirstItem : void 0}
       key={item.id}
       item={item}
       onClick={fOnClickItem(item)}
     />
    )
  )}
 </div>
))

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
