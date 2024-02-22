import { TableItem } from './TableItem';

const S_TH_MORE = {
  paddingLeft: 12,
  textAlign: 'left'
}
, CONFIG_PROP_NAMES = ['m', 'g', 'l'];

export const AlphaPerfItem = ({
  config,
  onCloseItem
}) => CONFIG_PROP_NAMES.map(pn => (
  <TableItem
    key={pn}
    isInitialClose={true}
    thMoreStyle={S_TH_MORE}
    config={config[pn]}
    onCloseItem={onCloseItem}
  />
))
  
