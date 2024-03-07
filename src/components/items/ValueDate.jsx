import { formatStrDate } from '../../utils/dateFn';
import { SpanValue } from '../zhn/SpanToken';

const CL_ITEM_TIME = 'item-time';

const S_VALUE = {
  paddingLeft: 16
};

const ValueDate = ({
  value,
  strDate
}) => (
   <>
    {value
       ? <SpanValue style={S_VALUE}>{value}</SpanValue>
       : null
    }
    {strDate
       ? <span className={CL_ITEM_TIME}>{formatStrDate(strDate)}</span>
       : null
    }
   </>
);

export default ValueDate
