//import PropTypes from 'prop-types'
import { useRef } from '../uiApi';
import { crAbsoluteTopLeftStyle } from '../styleFn';

import { useToggle } from '../hooks/useToggle';
import { useKeyEnter } from '../hooks/fUseKey';

import ShowHide from '../zhn/ShowHide';
import SparklinesLazy from '../zhn-lazy/SparklinesLazy';

const {
  SparkView,
  Line,
  Spot,
  MaxLabel,
  MinLabel
} = SparklinesLazy;

const COLOR_MAX = "#8bc34a";
const COLOR_MIN = "#f44336";
const COLOR_EQUAL = 'black';
const SPOT_COLORS = {'-1': COLOR_MIN, '0': COLOR_EQUAL, '1': COLOR_MAX };

const S_CAPTION = {
  position: 'relative',
  padding: 3,
  marginBottom: 5,
  lineHeight: 1.8,
  opacity: 0.7
},
S_CAPTION_BT = {
  ...crAbsoluteTopLeftStyle(4, 8, !0),  
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer'
},
S_ITEM = {
  padding: 3,
  cursor: 'pointer'
},
S_ITEM_TITLE = {
  display: 'inline-block',
  width: 30,
},
S_ITEM_VALUE = {
  display: 'inline-block',
  float: 'right'
};

const Caption = ({
  color,
  from,
  to,
  onClick
}) => {
  const _hKeyDown = useKeyEnter(onClick);
  return (
    <p style={{ ...S_CAPTION, ...{ background: color } }}>
      <span>{from}&nbsp;&ndash;&nbsp;{to}</span>
      <span
        tabIndex="0"
        role="button"
        style={S_CAPTION_BT}
        onClick={onClick}
        onKeyDown={_hKeyDown}
      >*</span>
    </p>
  );
}

const Item = ({
  title,
  value,
  status,
  onClick
}) => {
  const _hKeyDown = useKeyEnter(onClick)
  , _value = status
    ? `${value} (${status})`
    : value;
  return (
    <div
      tabIndex="0"
      role="button"
      style={S_ITEM}
      onClick={onClick}
      onKeyDown={_hKeyDown}
    >
      <span style={S_ITEM_TITLE}>
         {title}
      </span>
      <span style={S_ITEM_VALUE}>
        {_value}
      </span>
    </div>
  );
}

const ClusterItem = ({
  point,
  color,
  index,
  isShowRange
}) => {
  const _refData = useRef(point.seria.data || [])
  , _refPointIndex = useRef(_refData.current.length-1)
  , [isShowChart, toggleIsShowChart] = useToggle(index < 3)

  return (
      <div>
        <Item
          title={point.id}
          value={point[0]}
          status={point.status}
          onClick={toggleIsShowChart}
        />
        <ShowHide isShow={isShowChart}>

          <SparkView
            height={32}
            width={140}
            svgHeight={32}
            svgWidth={140}
            data={_refData.current}
            margin={3}
            //marginLeft={20}
          >
            {isShowRange
              ? <MaxLabel color={COLOR_MAX} fontSize={14} />
              : <span/>
            }
            {isShowRange
              ? <MinLabel color={COLOR_MIN} fontSize={14} />
              : <span/>
            }
             <Line color={color} />
             <Spot
                 pointIndex={_refPointIndex.current}
                 size={3}
                 spotColors={SPOT_COLORS}
             />
          </SparkView>

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

const Cluster = ({
  cluster,
  color,
  isShowRange
}) => {
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

const ClusterInfo = ({
  cluster,
  color,
  from,
  to
}) => {
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
