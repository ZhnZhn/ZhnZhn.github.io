import ModalPopup from '../zhn-moleculs/ModalPopup';
import RowCheckBox3 from '../dialogs/rows/RowCheckBox3';
import { getColorBlack } from './Style';

const S_ROW = {
  paddingLeft: 0,
  paddingBottom: 4
}
, _crHrStyle = () => ({
  borderColor: getColorBlack(),
  marginTop: 2,
  marginBottom: 2
});

const _renderHeaders = (
  headers,
  onToggle
) => {
  /*eslint-disable no-unused-vars*/
  const [rank, ...restHeader] = headers
  /*eslint-enable no-unused-vars*/
  , _colorBlack = getColorBlack();
  return restHeader.map((h, index) => (
    <RowCheckBox3
      key={h.name}
      style={S_ROW}
      color={_colorBlack}
      caption={h.name}
      value={!h.isHide}
      onToggle={() => onToggle(index+1)}
    />
  ))
}

const ModalMenu = ({
  isShow,
  isGridLine,
  style,
  headers,
  onToggleGrid,
  onToggle,
  onClose
}) => (
  <ModalPopup
     style={style}
     isShow={isShow}
     onClose={onClose}
   >
     <RowCheckBox3
       style={S_ROW}
       color={getColorBlack()}
       caption="withStripLines"
       value={isGridLine}
       onToggle={onToggleGrid}
     />
     <hr style={_crHrStyle()} />
     {_renderHeaders(headers, onToggle)}
  </ModalPopup>
);


export default ModalMenu
