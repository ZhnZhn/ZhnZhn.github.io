
const fnAdapter = {
  crId: (option) => {
    const { items, dfId='id' } = option
         , _caption =  items[0] ? items[0].caption : 'All Items'
    return dfId + '_' + _caption;
  },

  crInfo: ({ label='', updated='' }) => ({
    name: label,
    description: 'Statisctics Norway: ' + updated.replace('T', ' ').replace('Z', '')    
  }),

  crZhConfig: (option) => {
    const { dataSource } = option
        , _id = fnAdapter.crId(option);
    return {
      id: _id,
      key: _id,
      itemCaption: _id,
      isWithoutAdd: true,
      isWithLegend: false,
      dataSource
    }
  }
}

export default fnAdapter
