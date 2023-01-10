import memoIsShow from '../hoc/memoIsShow';
import usePasteTo from './usePasteTo';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import SeriesPane from './SeriesPane';

const S_MODAL = {
  position: 'static',
  width: 365,
  height: 340,
  margin: '70px auto 0px'
}, S_SERIES_PANE = {
  overflowY: 'auto',
  height: 250,
  padding: '8px 10px 0 0'
};

const DF_DATA = {};

const PasteToModalDialog = memoIsShow(({
  isShow,
  data=DF_DATA,
  onClose
}) => {
  const [
    toChart,
    refCompSeries,
    commandButtons
  ] = usePasteTo(data, onClose)
  , { fromChart } = data;

  return (
    <ModalDialog
      isShow={isShow}
      style={S_MODAL}
      caption="Paste Series To"
      commandButtons={commandButtons}
      onClose={onClose}
    >
      <SeriesPane
         ref={refCompSeries}
         style={S_SERIES_PANE}
         fromChart={fromChart}
         toChart={toChart}
      />
    </ModalDialog>
  );
})

export default PasteToModalDialog
