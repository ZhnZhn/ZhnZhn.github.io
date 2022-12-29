import Link from './Link';

const DATA_URL = 'https://www.fao.org/faostat/en/#data/';
const _isStr = v => typeof str === 'string';

const FaoStatLink = ({
  item
}) => (
  <Link
    isHttp={true}
    href={_isStr(item)
       ? DATA_URL + item
       : DATA_URL
    }
    caption="FAOSTAT Link"
  />
);

export default FaoStatLink
