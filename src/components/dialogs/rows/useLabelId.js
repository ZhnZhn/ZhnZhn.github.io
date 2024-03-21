import { useId } from '../../uiApi';

const useLabelId = ({
  isShowLabels
}) => {
  const id = useId();
  return isShowLabels
    ? id
    : void 0;
};

export default useLabelId
