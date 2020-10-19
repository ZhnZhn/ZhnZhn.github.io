import { useRef } from 'react'
//import PropTypes from 'prop-types'

import ShowHide from '../zhn/ShowHide'
import {
  Sparklines,
  SparklinesLine,
  //SparklinesSpots,
  SparklinesSpot,
  SparklinesMaxLabel,
  SparklinesMinLabel
} from '../zhn-sparklines/Sparklines'

import use from '../hooks/use'

const { useToggle, useKeyEnter } = use

const COLOR_MAX = "#8bc34a";
const COLOR_MIN = "#f44336";
const COLOR_EQUAL = 'black';
const SPOT_COLORS = {'-1': COLOR_MIN, '0': COLOR_EQUAL, '1': COLOR_MAX };

const S = {
  CAPTION: {
    position: 'relative',
    padding: 3,
    marginBottom: 5,
    lineHeight: 1.8,
    opacity: 0.7
  },
  CAPTION_BT: {
    position: 'absolute',
    top: 4,
    right: 8,
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  ITEM_ROOT: {
    padding: 3,
    cursor: 'pointer'
  },
  ITEM_TITLE: {
    display: 'inline-block',
    width: 30,
  },
  ITEM_VALUE: {
    display: 'inline-block',
    float: 'right'
  }
}


const Caption = ({ color, from, to, onClick }) => {
  const _hKeyDown = useKeyEnter(onClick);
  return (
    <p style={{ ...S.CAPTION, ...{ background: color } }}>
      <span>{from}&nbsp;&ndash;&nbsp;{to}</span>
      <span
        tabIndex="0"
        role="button"
        style={S.CAPTION_BT}
        onClick={onClick}
        onKeyDown={_hKeyDown}
      >*</span>
    </p>
  );
}

const Item = ({ title, value, status, onClick }) => {
  const _hKeyDown = useKeyEnter(onClick)
  , _value = status
    ? `${value} (${status})`
    : value;
  return (
    <div
      tabIndex="0"
      role="button"
      style={S.ITEM_ROOT}
      onClick={onClick}
      onKeyDown={_hKeyDown}
    >
      <span style={S.ITEM_TITLE}>
         {title}
      </span>
      <span style={S.ITEM_VALUE}>
        {_value}
      </span>
    </div>
  );
}

const ClusterItem = ({ point, color, index, isShowRange }) => {
  const _refData = useRef(point.seria.data || [])
  , _refPointIndex = useRef(_refData.current.length-1)
  , [isShowChart, toggleIsShowChart] = useToggle(index < 3)

  const _maxLabel = isShowRange
          ? <SparklinesMaxLabel color={COLOR_MAX} fontSize={14} />
          : <span/>
      , _minLabel = isShowRange
          ? <SparklinesMinLabel color={COLOR_MIN} fontSize={14} />
          : <span/>;
  return (
      <div>
        <Item
          title={point.id}
          value={point[0]}
          status={point.status}
          onClick={toggleIsShowChart}
        />
        <ShowHide isShow={isShowChart}>
          <Sparklines
            height={32}
            width={140}
            svgHeight={32}
            svgWidth={140}
            data={_refData.current}
            margin={3}
            //marginLeft={20}
          >
             {_maxLabel}
             {_minLabel}
             <SparklinesLine color={color} />
             {/*<SparklinesSpots />*/}
             <SparklinesSpot
                 pointIndex={_refPointIndex.current}
                 size={3}
                 spotColors={SPOT_COLORS}
             />
          </Sparklines>
      </ShowHide>
     </div>
  );
}


/*
 ClusterItem.propTypes = {
  point: PropTypes.shape({
    0: PropTypes.number,
    id: PropTypes.string,
    status: PropTypes.string,
    seria: PropTypes.shape({
      data: PropTypes.array
    })
  }),
  color: PropTypes.string,
  index: PropTypes.number,
  isShowRange: PropTypes.bool
}
*/

const Cluster = ({ cluster, color, isShowRange }) => {
  const points = cluster.points || [];
  return (
    <div>
      {
        points.map( (point, index) => (
          <ClusterItem
             key={point.id}
             {...{ point, color, index, isShowRange }}
          />
        ))
      }
    </div>
  );
};
/*
Cluster.propTypes = {
  cluster: PropTypes.shape({
    points: PropTypes.arrayOf(
        PropTypes.shape({
           id: PropTypes.string
    }))
  }),
  color: PropTypes.string
}
*/

const ClusterInfo = ({ cluster, color, from, to }) => {
  const [isShowRange, onClick] = useToggle(false);
  return  (
    <div>
      <Caption {...{ color, from, to, onClick } } />
      <Cluster {...{ cluster, color, isShowRange } } />
    </div>
  );
}

/*
ClusterInfo.propTypes = {
  cluster: PropTypes.object,
  color: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string
}
*/

export default ClusterInfo
