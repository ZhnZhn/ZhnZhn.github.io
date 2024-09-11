import { formatStrDate } from '../../utils/dateFn';
import {
  SpanValue,
  SpanDate
} from '../zhn/SpanToken';

const PL_16 = { paddingLeft: 16 };

const ValueDate = ({
  value,
  strDate
}) => (
   <>
    {value
       ? <SpanValue style={PL_16}>{value}</SpanValue>
       : null
    }
    {strDate
       ? <SpanDate style={PL_16}>{formatStrDate(strDate)}</SpanDate>
       : null
    }
   </>
);

export default ValueDate
