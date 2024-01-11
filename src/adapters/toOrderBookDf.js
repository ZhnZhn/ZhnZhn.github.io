import crAdapterOrderBook from './crAdapterOrderBook';

const crTitle = ({ items }) => items[0].c;
const toOrderBook = crAdapterOrderBook({ crTitle });

export default toOrderBook
