import Link from './Link'

const C = {
  ROOT_URI: 'https://www.quandl.com/data/',
  CAPTION: 'Quandl Data Link',
  STYLE: {
    color: '#e05927'
  }
};

const QuandlLink = ({ dbCode, dsCode, caption=C.CAPTION }) => {
  if (!dbCode || !dsCode){
    return null;
  }
  return (
    <Link
      style={C.STYLE}
      href={`${C.ROOT_URI}${dbCode}/${dsCode}`}
      caption={`${caption} ${dbCode}/${dsCode}`}
    />)
};

export default QuandlLink
