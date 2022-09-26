
const getTransferData = event => JSON
 .parse(event.dataTransfer.getData("text"));

export default getTransferData
