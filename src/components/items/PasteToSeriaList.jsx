import SeriaRow from './SeriaRow';

const PasteToSeriaList = ({
  chartId,
  series,
  options,
  onReg,
  onUnReg
}) => (
  <>
   {(series || [])
     .filter(seria => seria.visible)
     .map((seria, index) => (
       <SeriaRow
          key={`${chartId}_${seria.name || ''}_${index}`}
          seria={seria}
          compIndex={index}
          yAxisOptions={options}
          onReg={onReg}
          onUnReg={onUnReg}
      />
    ))}
 </>
);

export default PasteToSeriaList
