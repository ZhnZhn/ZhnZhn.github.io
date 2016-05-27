
const WatchDefault = {
    groups : [
      {
         caption : 'Economic Metrics',
         lists : [
           { caption : 'List1'},
           { caption : 'List2'},
           { caption : 'List3'}
         ]
      },
      {
        caption : 'Currencies' ,
        lists : [
          { caption : 'List1' },
          { caption : 'List2' },
          { caption : 'List3' }
        ]
      },
      {
        caption : 'Commodities',
        lists : [
          { caption : 'List1' },
          { caption : 'List2' },
          { caption : 'List3' }
        ]
      },
      {
        caption : 'Stocks' ,
        lists : [
          { caption : 'List1' },
          { caption : 'List2' },
          { caption : 'List3' }
        ]
      },
      {
        caption : 'Indexes',
        lists : [
          { caption : 'List1' },
          { caption : 'List2' },
          { caption : 'List3' }
        ]
      },
      {
        caption : 'Futures',
        lists : [
          { caption : 'List1' },
          { caption : 'List2' },
          { caption : 'List3' }
        ]
      }
    ]
}

WatchDefault.fDefaultGroup = function({caption='Default'}){
  return { caption }
}

export default WatchDefault
