const CL_ROW = 'row__pane-topic not-selected';

const crModel = (comp, {
  onToggle, onToTop, onHideCaption
}) => ({
    baseTitleCl: CL_ROW,
    pageWidth: 150,
    maxPages: 1,
    p0: [{
      name: 'Move to Top',
      onClick: onToTop,
      isClose: true
    },{
      name: 'Toggle Toolbar',
      onClick: onToggle.bind(comp),
      isClose: true
    },{
      name: 'Hide Caption',
      onClick: onHideCaption.bind(comp),
      isClose: true
    }]
});


export default crModel
