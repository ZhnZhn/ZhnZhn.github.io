import crAdapterOrderBook from '../crAdapterOrderBook';
import AdapterFn from '../AdapterFn';

const { toTd } = AdapterFn
, crTitle = ({ items }, { timestamp }) => {
  const strDate = toTd(parseInt(timestamp, 10)*1000);
  return `${items[0].c} ${strDate}`;
}
, crLimit = ({ items }) => parseInt(items[1].v, 10);

const toOrderBook = crAdapterOrderBook({ crTitle, crLimit });

export default toOrderBook
