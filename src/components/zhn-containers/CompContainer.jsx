import useStoreState from '../hooks/useStoreState';

const CL = "hrz-container";
const updateContainers = (
  msInit,
  setContainers
) => {
  if (msInit && msInit.Comp) {
    setContainers(arrComp => [msInit.Comp, ...arrComp])
  }
};

const CompContainer = ({
  className=CL,
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
