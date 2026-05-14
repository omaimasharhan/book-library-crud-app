const updateButtons = document.querySelectorAll('.update-button')

updateButtons.forEach(button => {
  button.addEventListener('click', () => {
    fetch('/books', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: button.dataset.id,
        title: 'Updated Book Title',
        author: 'Updated Author'
      })
    })
    .then(res => res.json())
    .then(data => {
      window.location.reload()
    })
  })
})

const deleteButtons = document.querySelectorAll('.delete-button')

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    fetch('/books', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: button.dataset.id
      })
    })
    .then(res => res.json())
    .then(data => {
      window.location.reload()
    })
  })
})