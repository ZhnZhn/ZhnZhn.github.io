import React from 'react'

import ShowHide from '../zhn/ShowHide';
import Legend from '../zhn/Legend';

const ChartLegend = ({ isShow, legend, onClickItem }) => {
  return legend ? (
    <ShowHide isShow={isShow}>
      <Legend
         legend={legend}
         onClickItem={onClickItem}
      />
    </ShowHide>
  ) : null;
};

export default ChartLegend
