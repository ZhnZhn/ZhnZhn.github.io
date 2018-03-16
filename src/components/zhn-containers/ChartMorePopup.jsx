import React from 'react'

import ModalPopup from '../zhn-moleculs/ModalPopup'

const CL = {
  POPUP: "popup-menu",
  ROW: "row__pane-topic",
  BT: "bt__left"
};

const S = {
  POPUP: {
    top: '36px',
    left: '8px',
    zIndex: 20
  },
  ROOT: {
    width: '180px'
  }
};

const ChartMorePopup = ({
  isShow,
  onClose,
  onResizeToMin,
  onResizeToInit,
  onPlusWidth,
  onMinusWidth,
  onFit
}) =>
<ModalPopup
  className={CL.POPUP}
  style={S.POPUP}
  isShow={isShow}
  onClose={onClose}
>
  <div style={S.ROOT}>
    <div className={CL.ROW}>
      <button
        className={CL.BT}
        onClick={onResizeToMin}
      >
        Resize to minWidth
      </button>
    </div>
    <div className={CL.ROW}>
      <button
        className={CL.BT}
        onClick={onResizeToInit}
      >
        Resize to initWidth
      </button>
    </div>
    <div className={CL.ROW}>
      <button
        className={CL.BT}
        onClick={onPlusWidth}
      >
        +10px to Width
      </button>
    </div>
    <div className={CL.ROW}>
      <button
        className={CL.BT}
        onClick={onMinusWidth}
      >
        -10px to Width
      </button>
    </div>
    <div className={CL.ROW}>
      <button
        className={CL.BT}
        onClick={onFit}
      >
        Items to Width
      </button>
    </div>
  </div>
</ModalPopup>

export default ChartMorePopup
