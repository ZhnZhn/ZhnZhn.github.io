import crAdapterOrderBook from '../crAdapterOrderBook';
import { toTd } from '../AdapterFn';

const crTitle = ({ items }, { ts }) => {
  const strDate = toTd(parseInt(ts, 10));
  return `${items[0].c} ${strDate}`;
};

const toOrderBook = crAdapterOrderBook({
  crTitle
});

export default toOrderBook
