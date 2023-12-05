import { useState } from '../uiApi';

const CL = "hrz-container";

const CompContainer = ({
  className=CL,
  useMsInit
}) => {
  const [
    containers,
    setContainers
  ] = useState([]);

  useMsInit(msInit => {
    if (msInit && msInit.Comp) {
      setContainers(arrComp => [msInit.Comp, ...arrComp])
    }
  })

  return (
    <div className={className}>
      {containers}
    </div>
  );
}

export default CompContainer
