import React, { Component, PropTypes } from 'react'

import ShowHide from '../zhn/ShowHide'
import {
  Sparklines,
  SparklinesLine,
  //SparklinesSpots,
  SparklinesSpot
} from '../zhn-sparklines/Sparklines'

const S = {
  CAPTION: {
    opacity: 0.7,
    padding: '3px',
    marginBottom: '5px'
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


const Caption = ({ color, from, to }) => (
  <p style={{ ...S.CAPTION, ...{ background: color} }}>
    {from}-{to}
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
    index: PropTypes.number
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
      const { point, color } = this.props
          , { isShowChart } = this.state;      
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
              width={120}
              svgHeight={32}
              svgWidth={120}
              data={this.data}
            >
               <SparklinesLine color={color} />
               {/*<SparklinesSpots />*/}
               <SparklinesSpot pointIndex={this.pointIndex} />
            </Sparklines>
        </ShowHide>
       </div>
      );
   }
}

const Cluster = ({ cluster,color }) => {
  const points = cluster.points || [];
  return (
    <div>
      {
        points.map( (point, index) => {
          return (
            <ClusterItem
               key={point.id}
               {...{ point, color, index }}
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

const ClusterInfo = ({ cluster, color, from, to }) => {
  return (
    <div>
      <Caption {...{ color, from, to }} />
      <Cluster {...{ cluster, color}} />
    </div>
  );
};

ClusterInfo.propTypes = {
  cluster: PropTypes.object,
  color: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string
}

export default ClusterInfo
