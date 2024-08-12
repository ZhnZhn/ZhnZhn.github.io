import Link from './Link';

const SnbLink = ({
  item
}) => item ? <Link
     caption="Swiss National Bank"
     href={item}     
/> : null;

export default SnbLink
