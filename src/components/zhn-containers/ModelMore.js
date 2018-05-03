import CA from '../../flux/actions/ChartActions';

const CL_ROW = 'row__pane-topic not-selected';

const crModelMore = ({
  chartType,
  onMinWidth, onInitWidth,
  onPlusWidth, onMinusWidth,
  onFit,
}) => {
  return {
    baseTitleCl: CL_ROW,
    p0: [
      {
        id: 'p1',
        type: 'sub',
        cn: CL_ROW,
        name: 'Resize'
      },{
        id: 'p2',
        type: 'sub',
        cn: CL_ROW,
        name: 'Sort By, ASC'
      }
    ],
    p1: [
      {
        cn: CL_ROW,
        name: 'to MinWidth',
        onClick: onMinWidth
      },{
        cn: CL_ROW,
        name: 'to InitWidth',
        onClick: onInitWidth
      },{
        cn: CL_ROW,
        name: '+10px to Width',
        onClick: onPlusWidth
      },{
        cn: CL_ROW,
        name: '-10px to Width',
        onClick: onMinusWidth
      },{
        cn: CL_ROW,
        name: 'Fit Items to Width',
        onClick: onFit
      }
    ],
    p2: [
      {
        cn: CL_ROW,
        name: 'Value',
        onClick: CA.sortBy.bind(null, chartType, '_value'),
        isClose: true
      },{
        cn: CL_ROW,
        name: 'Abs Delta',
        onClick: CA.sortBy.bind(null, chartType, '_deltaAbs'),
        isClose: true
      },{
        cn: CL_ROW,
        name: 'Abs Percent',
        onClick: CA.sortBy.bind(null, chartType, '_percentAbs'),
        isClose: true
      },{
        cn: CL_ROW,
        name: 'Reverse',
        onClick: CA.reverseCharts.bind(null, chartType),
        isClose: true
      }
    ]
  };
}

export default crModelMore
