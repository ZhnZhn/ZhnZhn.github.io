import React from 'react'

import CellColor from './CellColor'

const S = {
  PANE: {
    margin: 10
  },
  ROW: {
    width: 120
  },
  COLOR: {
    display: 'inline-block',
    height: 32,
    width: 32,
    margin: 4,
    borderRadius: 2,
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
}

const CellColorPane = React.memo(({ model, onClickCell }) => {

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
