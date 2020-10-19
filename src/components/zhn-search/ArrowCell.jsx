const CL_BT = 'zhn-select__bt-arrow'

const S = {
  ARROW_CELL: {
    position: 'absolute',
    top: 10,
    right: 0,
    width: 35,
    paddingRight: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  ARROW: {
    position: 'relative',
    top: 2,
    display: 'inline-block',
    height: 0,
    width: 0,
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '10px 8px 4px'
  }
}

const ArrowCell = ({ arrowStyle, tabIndex="-1", onClick }) => (
  <button
     className={CL_BT}
     style={S.ARROW_CELL}
     tabIndex={tabIndex}
     onClick={onClick}>
    <span style={{ ...S.ARROW, ...arrowStyle}}/>
  </button>
);


export default ArrowCell
