import { crAdapterOrderBook } from '../crAdapterOrderBook';

const crTitle = ({ items }) => items[0].v;
const toOrderBook = crAdapterOrderBook({ crTitle });

export default toOrderBook
