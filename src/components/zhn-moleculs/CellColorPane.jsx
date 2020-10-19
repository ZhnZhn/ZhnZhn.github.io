import { memo } from 'react'

import CellColor from './CellColor'

const CL_INPUT_COLOR = "va-b"

const S = {
  PANE: {
    margin: 10
  },
  ROW: {
    width: 120
  },
  COLOR: {
    margin: 4
  }
}

const CellColorPane = memo(({ model, onClickCell }) => {

   const { rows, cols, colors } = model
   , _elRows = [];

   let r, c, _color, _idPrefix;
   for(r=0; r<rows; r++){
     let _elCells = [];
     _idPrefix = colors[r*cols]
     for(c=0; c<cols; c++){
       _color = colors[r*cols + c]
       _elCells.push((
         <CellColor
           key={_color}
           className={CL_INPUT_COLOR}
           style={S.COLOR}
           color={_color}
           onClick={onClickCell.bind(null, _color)}
         />
       ))
     }
     _elRows.push((
       <div
         key={_idPrefix + r}
         style={S.ROW}
       >
         {_elCells}
       </div>
     ))
   }

   return (
    <div style={S.PANE}>
      {_elRows}
    </div>
  );
})

export default CellColorPane
