const agendar = document.querySelector('.button-new-schedules')
const modalContainer = document.querySelector('#modal-container')
const closeButton = document.querySelector('.close-button')
const form = document.querySelector("#new-schedule-form")
const fundoDeVidro = document.querySelector("#fundoDeVidro")


import { createSchedules, loadSchedules } from "./schedules.js"

document.addEventListener('DOMContentLoaded', async () => {
    const dateInput = document.querySelector("#date")
    const today = dayjs().format("YYYY-MM-DD")

    if (dateInput) {
        dateInput.value = today
    }

    await loadSchedules()
})

agendar.addEventListener('click', () => {
    modalContainer.showModal()
    fundoDeVidro.classList.add("fundoDeVidro")
})

closeButton.addEventListener('click', () => {
    modalContainer.close()
    fundoDeVidro.classList.remove("fundoDeVidro")
})

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
        await createSchedules()

        alert("Agendamento criado com sucesso")
        form.reset()
        modalContainer.close()
        fundoDeVidro.classList.remove("fundoDeVidro")
    } catch (error) {
        alert("Não foi possível criar seu agendamento")
        console.error("Erro no fluxo de agendamento.",error)
    }
})
