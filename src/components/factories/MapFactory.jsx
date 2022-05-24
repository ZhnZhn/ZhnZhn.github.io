import ClusterInfo from '../map/ClusterInfo';

export const crClusterInfo = (props) => (
   <ClusterInfo {...props} />
);

export const crInfo = ({
  label,
  value
}) => (
  <p>
    <span>
      {label}:&nbsp;
    </span>
    <span>
      {value || 'unknown'}
    </span>
  </p>
);
