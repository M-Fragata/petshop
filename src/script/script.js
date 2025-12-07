const agendar = document.querySelector('.button-new-schedules')
const modalContainer = document.querySelector('#modal-container')
const closeButton = document.querySelector('.close-button')
const form = document.querySelector(".new-schedule-form")

import { createSchedules } from "./loadSchedules.js"

agendar.addEventListener('click', () => {
    modalContainer.showModal()
})

closeButton.addEventListener('click', () => {
    modalContainer.close()
})

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    await createSchedules()

    form.reset()
    modalContainer.close()
})