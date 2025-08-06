import {
  isArr,
  safeMap
} from "../uiApi";

import {
  CL_OPEN_CLOSE_BLACK
} from "../styleFn";

import OpenClose from "../zhn/OpenClose";
import InputSwitch from "../zhn/InputSwitch";
import ModalPane from "../zhn-moleculs/ModalPane";

import { getColorBlack } from "./Style";

const S_ROW = {
  padding: '6px 0',
  lineHeight: 'initial'
}
, _crHrStyle = () => ({
  borderColor: getColorBlack(),
  marginTop: 2,
  marginBottom: 2
})
, S_OPEN_CLOSE = {
  lineHeight: 1.5
};

const _crRowCheckBoxElement = (
  h,
  color,
  onToggle
) => (
  <InputSwitch
    key={h.name}
    style={S_ROW}
    caption={h.name}
    initialValue={!h.isHide}
    onToggle={onToggle}
  />
)

const MenuPart = ({
  item,
  color,
  onToggle
}) => (
  <OpenClose
    className={CL_OPEN_CLOSE_BLACK}
    childStyle={S_OPEN_CLOSE}
    caption={item.caption}
  >
    {safeMap(
      item.items,
      h => _crRowCheckBoxElement(h, color, () => onToggle(h.id))
    )}
  </OpenClose>
);


const MenuItems = ({
  headers,
  onToggle
}) => {
  /*eslint-disable no-unused-vars*/
  const [rank, ...restHeader] = headers
  /*eslint-enable no-unused-vars*/
  , _colorBlack = getColorBlack();
  return safeMap(restHeader, (h, index) => isArr(h.items)
    ? (<MenuPart
         key={h.caption}
         item={h}
         color={_colorBlack}
         onToggle={onToggle}
       />)
    : _crRowCheckBoxElement(
         h, _colorBlack,
         () => onToggle(h.id || (index+1))
      )
  );
};

const ModalMenu = ({
  isShow,
  isGridLine,
  style,
  headers,
  onToggleGrid,
  onToggle,
  onClose
}) => (
  <ModalPane
     isShow={isShow}
     style={style}
     onClose={onClose}
   >
     <InputSwitch
       style={S_ROW}
       caption="withStripLines"
       initialValue={isGridLine}
       onToggle={onToggleGrid}
     />
     <hr style={_crHrStyle()} />
     <MenuItems
       headers={headers}
       onToggle={onToggle}
     />
  </ModalPane>
);

export default ModalMenu
