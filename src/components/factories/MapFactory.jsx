import React from 'react'

import ClusterInfo from '../map/ClusterInfo'

const MapFactory = {
  crClusterInfo(props){
    return (
      <ClusterInfo {...props} />
    );
  }
}

export default MapFactory
