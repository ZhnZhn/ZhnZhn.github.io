import RowPlusMinus from './RowPlusMinus';
import useMomAth from './useMomAth';

const RowMomAth = ({
  getChart,
  onAddMfi,
  onRemoveMfi
}) => {
  const [
    isMomAth,
    addMomAth,
    removeMomAth
  ] = useMomAth(
     getChart,
     onAddMfi,
     onRemoveMfi
  );
  return (
    <RowPlusMinus
       is={isMomAth}
       caption="MOM(1) & ATH"
       onPlus={addMomAth}
       onMinus={removeMomAth}
     />
  );
}

export default RowMomAth
