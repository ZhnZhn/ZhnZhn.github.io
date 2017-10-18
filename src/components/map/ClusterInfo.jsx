import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ShowHide from '../zhn/ShowHide'
import {
  Sparklines,
  SparklinesLine,
  //SparklinesSpots,
  SparklinesSpot,
  SparklinesMaxLabel,
  SparklinesMinLabel
} from '../zhn-sparklines/Sparklines'

const COLOR_MAX = "#8bc34a";
const COLOR_MIN = "#f44336";
const COLOR_EQUAL = 'black';
const SPOT_COLORS = {'-1': COLOR_MIN, '0': COLOR_EQUAL, '1': COLOR_MAX };

const S = {
  CAPTION: {
    position: 'relative',
    opacity: 0.7,
    lineHeight: 1.8,
    padding: '3px',
    marginBottom: '5px'
  },
  CAPTION_BT: {
    position: 'absolute',
    top: '4px',
    right: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  ITEM_ROOT: {
    padding: '3px',
    cursor: 'pointer'
  },
  ITEM_TITLE: {
    display: 'inline-block',
    width: '30px',
  },
  ITEM_VALUE: {
    display: 'inline-block',
    float: 'right'
  }
}


const Caption = ({ color, from, to, onClick }) => (
  <p style={{ ...S.CAPTION, ...{ background: color } }}>
    <span>{from}&nbsp;&ndash;&nbsp;{to}</span>
    <span style={S.CAPTION_BT} onClick={onClick}>*</span>
  </p>
);


const Item = ({ title, value, onClick }) => (
  <p
    style={S.ITEM_ROOT}
    onClick={onClick}
  >
    <span style={S.ITEM_TITLE}>
       {title}
    </span>
    <span style={S.ITEM_VALUE}>
      {value}
    </span>
  </p>
);

class ClusterItem extends Component {
  static propTypes = {
    point: PropTypes.shape({
      0: PropTypes.number,
      id: PropTypes.string,
      seria: PropTypes.shape({
        data: PropTypes.array
      })
    }),
    color: PropTypes.string,
    index: PropTypes.number,
    isShowRange: PropTypes.bool
  }

  constructor(props){
    super()
    this.data = props.point.seria.data
    this.pointIndex = this.data.length - 1
    this.state = {
      isShowChart: (props.index<3) ? true : false
    }
  }

  _handleClickItem = () => {
    this.setState(prevState => {
      return {
        isShowChart: !prevState.isShowChart
      };
    })
  }

  render(){
      const { point, color, isShowRange } = this.props
          , { isShowChart } = this.state
          , _maxLabel = (isShowRange)
              ? <SparklinesMaxLabel color={COLOR_MAX} fontSize={14} />
              : <span/>
          , _minLabel = (isShowRange)
              ? <SparklinesMinLabel color={COLOR_MIN} fontSize={14} />
              : <span/>;

      return (
        <div>
          <Item
            title={point.id}
            value={point[0]}
            onClick={this._handleClickItem}
          />
          <ShowHide isShow={isShowChart}>
            <Sparklines
              height={32}
              width={140}
              svgHeight={32}
              svgWidth={140}
              data={this.data}
              margin={3}
              //marginLeft={20}
            >
               {_maxLabel}
               {_minLabel}
               <SparklinesLine color={color} />
               {/*<SparklinesSpots />*/}
               <SparklinesSpot
                   pointIndex={this.pointIndex}
                   size={3}
                   spotColors={SPOT_COLORS}
                 />
            </Sparklines>
        </ShowHide>
       </div>
      );
   }
}

const Cluster = ({ cluster,color, isShowRange }) => {
  const points = cluster.points || [];
  return (
    <div>
      {
        points.map( (point, index) => {
          return (
            <ClusterItem
               key={point.id}
               {...{ point, color, index, isShowRange }}
            />
          );
        })
      }
    </div>
  );
};
Cluster.propTypes = {
  cluster: PropTypes.shape({
    points: PropTypes.arrayOf(
        PropTypes.shape({
           id: PropTypes.string
    }))
  }),
  color: PropTypes.string
}

class ClusterInfo extends Component {
  constructor(props){
    super()
    this.state = {
      isShowRange: false
    }
  }
  _handleToggleRange = () => {
    this.setState(prevState => ({isShowRange: !prevState.isShowRange }))
  }

  render(){
    const  { cluster, color, from, to } = this.props
        ,  { isShowRange } = this.state;
    return  (
      <div>
        <Caption {...{ color, from, to, onClick:this._handleToggleRange } } />
        <Cluster {...{ cluster, color, isShowRange } } />
      </div>
    );
  }
}

ClusterInfo.propTypes = {
  cluster: PropTypes.object,
  color: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string
}

export default ClusterInfo
