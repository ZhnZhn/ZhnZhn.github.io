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

const _useRowType1 = (mathFn, getChart) => {
  const [is, setIs] = useState(false)
  , [setColor, getColor] = useProperty(DF_COLOR)
  , _onPlus = () => {
     setIs(mathFn(getChart(), getColor()))
  }
  , compAfter = is
     ? null
     : <A.SvgPlus style={S.INLINE} onClick={_onPlus} />;

  return [compAfter, setColor];
};


const RowType1 = ({
  caption,
  mathFn,
  getChart
}) => {
  const [
    compAfter, onColor
  ] = _useRowType1(mathFn, getChart);

  return (
    <A.OpenClose
      caption={caption}
      style={S.ROOT_OC}
      ocStyle={S.OC}
      captionStyle={S.CAPTION}
      openColor={OC_COLOR}
      CompAfter={compAfter}
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
  return (
    <ModalPopup
      style={{...STYLE.ROOT, ...style}}
      isShow={isShow}
      onClose={onClose}
    >
      <div style={S.PANE}>
        <RowType1
           caption="Rate (S1/S2)"
           mathFn={addCategoryRateTo}
           getChart={getChart}
        />
        <RowType1
           caption="Diff (S1-S2)"
           mathFn={addCategoryDiffTo}
           getChart={getChart}
        />
      </div>
    </ModalPopup>
  );
}

export default ModalMenuInd2
