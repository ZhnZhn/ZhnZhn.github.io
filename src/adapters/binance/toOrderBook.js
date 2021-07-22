import crAdapterOrderBook from '../crAdapterOrderBook';

const crTitle = ({ items }) => items[0].s;
const toOrderBook = crAdapterOrderBook({ crTitle });

export default toOrderBook
