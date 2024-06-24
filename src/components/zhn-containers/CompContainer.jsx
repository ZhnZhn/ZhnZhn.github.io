import { CL_HRZ_CONTAINER } from '../styleFn';
import useStoreState from '../hooks/useStoreState';

const updateContainers = (
  msInit,
  setContainers
) => {
  if (msInit && msInit.Comp) {
    setContainers(arrComp => [msInit.Comp, ...arrComp])
  }
};

const CompContainer = ({
  className=CL_HRZ_CONTAINER,
  useMsInit
}) => {
  const containers = useStoreState(
    [],
    useMsInit,
    updateContainers
  )[0];

  return (
    <div className={className}>
      {containers}
    </div>
  );
}

export default CompContainer
