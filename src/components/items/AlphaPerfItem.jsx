import TableItem from './TableItem';

const S_TH_MORE = {
  paddingLeft: 12,
  textAlign: 'left'
};

const AlphaPerfItem = ({
  config,
  onCloseItem
}) => (
  <>
    <TableItem
      thMoreStyle={S_TH_MORE}
      config={config.m}
      onCloseItem={onCloseItem}
    />
    <TableItem
      thMoreStyle={S_TH_MORE}
      config={config.y}
      onCloseItem={onCloseItem}
    />
  </>
);

export default AlphaPerfItem
