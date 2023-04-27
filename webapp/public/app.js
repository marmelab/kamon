document.querySelector('#toggleHighlight').addEventListener('click', (e) => {
  if (e.target.dataset.highlighted == 'true') {
    document.querySelectorAll('.tile').forEach(tile => {
      tile.classList.remove('tile--allowed-move-false')
    })
    e.target.dataset.highlighted = false
    return
  }

  e.target.dataset.highlighted = true
  document.querySelectorAll('.tile').forEach(tile => {
    const allowed = tile.dataset.allowedMove;
    if (allowed == 'false') {
      tile.classList.add('tile--allowed-move-false')
    }
  })
})