import { TableItem } from './TableItem';

const S_TH_MORE = {
  paddingLeft: 12,
  textAlign: 'left'
};

export const AlphaPerfItem = ({
  config,
  onCloseItem
}) => (
  <>
    <TableItem
      isInitialClose={true}
      thMoreStyle={S_TH_MORE}
      config={config.m}
      onCloseItem={onCloseItem}
    />
    <TableItem
      isInitialClose={true}
      thMoreStyle={S_TH_MORE}
      config={config.g}
      onCloseItem={onCloseItem}
    />
    <TableItem
      isInitialClose={true}
      thMoreStyle={S_TH_MORE}
      config={config.l}
      onCloseItem={onCloseItem}
    />
  </>
)
