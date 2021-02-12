import { useState } from 'react'
import useProperty from '../hooks/useProperty'
import IndicatorBuilder from '../../charts/IndicatorBuilder'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import STYLE from './ModalMenu.Style'
import A from '../zhn/A'
import D from '../dialogs/DialogCell';

const {
  addCategoryRateTo,
  addCategoryDiffTo
} = IndicatorBuilder;

const DF_COLOR = '#2b908f';
const OC_COLOR = 'black';

const S = {
  PANE: {
    width: 160,
    margin: 8
  },

  COLOR: {
    display: 'inline-block',
    paddingLeft: 10
  },
  //OC
  ROOT_OC: {
    lineHeight: 'unset',
    paddingBottom: 4,
    marginLeft: -8
  },
  OC: {
    display: 'inline-block',
    height: 32,
    paddingTop: 4,
    width: 'auto',
    paddingRight: 8
  },
  CAPTION: {
    color: OC_COLOR
  },

  //COLOR
  NONE: {
    display: 'none'
  },
  COLOR_INPUT: {
    marginBottom: 2
  },
}

const RowType1 = ({
  caption,
  is,
  onPlus,
  onColor
}) => {
  const _compAfter = is
    ? null
    : <A.SvgPlus style={S.INLINE} onClick={onPlus} />
  return (
    <A.OpenClose
      caption={caption}
      style={S.ROOT_OC}
      ocStyle={S.OC}
      captionStyle={S.CAPTION}
      openColor={OC_COLOR}
      CompAfter={_compAfter}
    >
      <D.RowInputColor
        styleRoot={S.COLOR}
        styleCaption={S.NONE}
        styleInput={S.COLOR_INPUT}
        initValue={DF_COLOR}
        onEnter={onColor}
      />
    </A.OpenClose>
  );
}

const ModalMenuInd2 = ({
  style, isShow, onClose,
  getChart
}) => {
  const [isRate, setIsRate] = useState(false)
  , [setRateColor, getRateColor] = useProperty(DF_COLOR)
  , [isDiff, setIsDiff] = useState(false)
  , [setDiffColor, getDiffColor] = useProperty(DF_COLOR)
  , _hRate = () => {
     const chart = getChart()
     , hasAdded = addCategoryRateTo(chart, getRateColor())
     setIsRate(hasAdded)
  }
  , _hDiff = () => {
     const chart = getChart()
     , hasAdded = addCategoryDiffTo(chart, getDiffColor())
     setIsDiff(hasAdded)
  };

  return (
    <ModalPopup
      style={{...STYLE.ROOT, ...style}}
      isShow={isShow}
      onClose={onClose}
    >
      <div style={S.PANE}>
        <RowType1
           caption="Rate (S1/S2)"
           is={isRate}
           onPlus={_hRate}
           onColor={setRateColor}
        />
        <RowType1
           caption="Diff (S1-S2)"
           is={isDiff}
           onPlus={_hDiff}
           onColor={setDiffColor}
        />
      </div>
    </ModalPopup>
  );
}

export default ModalMenuInd2
