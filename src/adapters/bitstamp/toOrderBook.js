import {
  parseIntBy10
} from '../../utils/isTypeFn';

import {
  fCrTitle,
  crAdapterOrderBook
} from '../crAdapterOrderBook';

const toOrderBook = crAdapterOrderBook({
  crTitle: fCrTitle("timestamp", true),
  crLimit: ({ items }) => parseIntBy10(items[1].v)
});

export default toOrderBook
