
const _assign = Object.assign;

const setTransferTo = ({
  event,
  dragId,
  xType
}) => {
  _assign(event.dataTransfer, {
    effectAllowed: "move",
    dropEffect: "move"
  }).setData(
    "text",
    JSON.stringify({dragId, xType})
  )
};

export default setTransferTo
