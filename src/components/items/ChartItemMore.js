const CL_ROW = 'row__pane-topic not-selected';

const _crItem = (name, onClick) => ({
  name, onClick,
  isClose: true
});

const crModel = (comp, {
  onToggle, onToTop, onHideCaption
}) => ({
    baseTitleCl: CL_ROW,
    pageWidth: 150,
    maxPages: 1,
    p0: [
      _crItem('Move to Top', onToTop),
      _crItem('Hide Caption', onHideCaption.bind(comp)),
      _crItem('Toggle Toolbar', onToggle.bind(comp))
   ]
});


export default crModel
