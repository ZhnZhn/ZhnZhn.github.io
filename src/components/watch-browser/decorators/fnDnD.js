const fnDnD = {
  setTransferTo: ({ event, dragId, xType }) => {
    Object.assign(event.dataTransfer, {
      effectAllowed: "move",
      dropEffect: "move"
    }).setData(
      "text", JSON.stringify({
        dragId, xType
      })
    )
  }
}

export default fnDnD
