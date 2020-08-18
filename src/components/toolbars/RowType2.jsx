import React from 'react'

import RowCaptionInput from './RowCaptionInput'
import SeriaConfigs from './SeriaConfigs'

const RowType2 = ({
  forwardRef,
  caption,
  initValue,
  configs,
  onAdd,
  onRemove
}) => (
    <>
      <RowCaptionInput
        caption={caption}
        forwardRef={forwardRef}
        initValue={initValue}
        onAdd={onAdd}
      />
      <SeriaConfigs
        configs={configs}
        onRemove={onRemove}
      />
    </>
);

export default RowType2
