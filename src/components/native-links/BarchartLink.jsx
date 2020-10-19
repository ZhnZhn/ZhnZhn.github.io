import Link from './Link'

const C = {
  URL: 'https://www.barchart.com/futures/quotes'
};

const BarchartLink = ({ item, style }) => item
  ? (<Link
      style={style}
      href={`${C.URL}/${item}/overview`}
      caption={`Barchart ${item}`}
     />)
  : null;

export default BarchartLink
