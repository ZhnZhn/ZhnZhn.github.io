import ModalPopup from '../zhn-moleculs/ModalPopup'
import D from '../dialogs/DialogCell'

const S = {
  ROW: {
    paddingLeft: 0,
    paddingBottom: 4
  },
  HR: {
    borderColor: 'black',
    marginTop: 2,
    marginBottom: 2
  }
};

const _renderHeaders = (headers, onToggle) => {
  /*eslint-disable no-unused-vars*/
  const [ rank, ...restHeader ] = headers;
  /*eslint-enable no-unused-vars*/
  return restHeader.map((h, index) => {
    return (<D.RowCheckBox
      key={h.name}
      style={S.ROW}
      checkedColor="black"
      caption={h.name}
      value={!h.isHide}
      onToggle={() => onToggle(index+1)}
    />
  )})
}

const ModalMenu = ({
  isShow, style,
  onClose,
  isGridLine,
  onToggleGrid,
  headers, onToggle
}) => (
  <ModalPopup
     style={style}
     isShow={isShow}
     onClose={onClose}
   >
     <D.RowCheckBox
       style={S.ROW}
       checkedColor="black"
       caption="withStripLines"
       value={isGridLine}
       onToggle={onToggleGrid}
     />
     <hr style={S.HR} />
     {_renderHeaders(headers, onToggle)}
  </ModalPopup>
);


export default ModalMenu
