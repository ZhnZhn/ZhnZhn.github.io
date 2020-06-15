import fnAdapter from './fnAdapter'

const {
  getValue,
  joinBy,
  toUpperCaseFirst
} = fnAdapter;

const _crCaption = ({ name='', symbol='', rank='' }) =>
  `${name} (${symbol}) (${rank})`;

const _getDate = str => str
  ? (''+str).split('T')[0]
  : '';
const _crToken = (name, value) => value
  ? `${name}: ${value}`
  : '';
const _crTokens = ({
  started_at,
  development_status,
  hardware_wallet,
  org_structure,
  hash_algorithm,
  proof_type,
  platform
}) => [
  _crToken('Started At', _getDate(started_at)),
  _crToken('Dev Status', development_status),
  _crToken('Org', org_structure),
  _crToken('Hardware Wallet', hardware_wallet),
  _crToken('Hash Alg.', hash_algorithm),
  _crToken('Proof Type', proof_type),
  _crToken('Platform', platform)
].filter(Boolean);

const _crOpenSource = is => is ? 'OpenSource': 'not OpenSource';
const _crIsActive = is => is ? 'Active': 'not Active';
const _crTokensCaption = ({ type, open_source, is_active}) => joinBy(' ',
  toUpperCaseFirst(type),
  _crOpenSource(open_source),
  _crIsActive(is_active)
);

const _crDescr = (json) => json.description || '';

const toCiConfig = {
  crKey(option){
    const { items=[] } = option;
    return (option._itemKey = getValue(items[0]));
  },

  toConfig(json, option) {
    const { _itemKey } = option
    , config = {
        zhCompType: "INFO_ITEM",
        id: _itemKey,
        caption: _crCaption(json),
        items: [
          {
            caption: _crTokensCaption(json),
            tokens: _crTokens(json)
          },{
            style: {
              fontWeight: 'bold'
            },
            descr: _crDescr(json)
          }
        ],
        zhConfig: {
          id: _itemKey,
          key: _itemKey
        }
    };
    return { config };
  }
}

export default toCiConfig
