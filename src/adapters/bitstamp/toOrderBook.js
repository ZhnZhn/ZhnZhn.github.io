import {
  fCrTitle,
  crAdapterOrderBook
} from '../crAdapterOrderBook';

const toOrderBook = crAdapterOrderBook({ 
  crTitle: fCrTitle("timestamp", true),
  crLimit: ({ items }) => parseInt(items[1].v, 10)
});

export default toOrderBook
