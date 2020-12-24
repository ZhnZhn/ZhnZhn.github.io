import Link from './Link'

const C = {
  BASE: 'http://www.fao.org/faostat/en/#data/'
};

const FaoStatLink = ({ item }) => (
  <Link
    isHttp={true}
    href={item ? C.BASE + item : C.BASE}
    caption="FAOSTAT Link"
  />
);



export default FaoStatLink
