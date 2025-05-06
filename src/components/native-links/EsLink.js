import ItemList from '../zhn/ItemList';
import Link from '../zhn/Link';

const EUROSTAT_DATA = 'Eurostat Data'
, DATA_URL = 'https://ec.europa.eu/eurostat'
, _crBrowserHref = dataset =>
   `${DATA_URL}/databrowser/view/${dataset}/default/table?lang=en`
, _crDatabaseNodeHref = dataset =>
   `${DATA_URL}/data/database?node_code=${dataset}`;

const _crToolLinks = dataset => dataset
  ? [[
      `${EUROSTAT_DATA} Browser`,
      _crBrowserHref(dataset)
    ],[
      `${EUROSTAT_DATA}base Node`,
      _crDatabaseNodeHref(dataset)
    ]]
  : void 0;

const _crLink = ([
  caption,
  href
]) => <Link href={href}>{caption}</Link>

const S_UL = {
  lineHeight: 2
};
const EsLink = ({
  item
}) => item ? (
  <ItemList
    style={S_UL}
    items={_crToolLinks(item.dataset)}
    crItem={_crLink}
  />
) : null;

export default EsLink
