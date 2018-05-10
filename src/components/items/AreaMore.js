const CL_ROW = 'row__pane-topic not-selected';

const crModel = (comp, {
  onToggle, onToTop
}) => {
  return {
    baseTitleCl: CL_ROW,
    pageWidth: 150,
    maxPages: 1,
    p0: [
      {
        //id: 'p1',
        //type: 'sub',
        cn: CL_ROW,
        name: 'Move to Top',
        onClick: onToTop,
        isClose: true
      },{
        cn: CL_ROW,
        name: 'Toggle Toolbar',
        onClick: onToggle.bind(comp),
        isClose: true
      }
    ]
  }
};

export default crModel
