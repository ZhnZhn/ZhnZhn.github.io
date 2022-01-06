import { useState } from 'react';
//import PropTypes from 'prop-types';
import useListen from '../hooks/useListen';

const CL = "hrz-container";

const CompContainer = ({
  className=CL,
  addAction
}) => {
  const [containers, setContainers] = useState([]);

  useListen((actionType, Comp) => {
    if (actionType === addAction) {
      setContainers(arrComp => [Comp, ...arrComp])
    }
  })
  return (
    <div className={className}>
      {containers}
    </div>
  );
}

/*
CompContainer.propTypes = {
  className: PropTypes.string,
  addAction: PropTypes.string
}
*/

export default CompContainer
