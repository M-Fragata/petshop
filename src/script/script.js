const agendar = document.querySelector('.button-new-schedules')
const modalContainer = document.querySelector('#modal-container')
const closeButton = document.querySelector('.close-button')

agendar.addEventListener('click', () => {
    modalContainer.showModal()
})

closeButton.addEventListener('click', () => {
    modalContainer.close()
})