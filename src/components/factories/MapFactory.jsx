import ClusterInfo from '../map/ClusterInfo'

const MapFactory = {
  crClusterInfo(props){
    return (
      <ClusterInfo {...props} />
    );
  },

  crInfo({ label, value }){
    return(
      <p>
        <span>
          {label}:&nbsp;
        </span>
        <span>
          {value ? value : 'unknown'}
        </span>
      </p>
    );
  }
}

export default MapFactory
