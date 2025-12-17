import { renderSchedules } from "./renderSchedules.js"

const URL = "http://localhost:3000/petSchedules"

export async function loadSchedules() {
    try {
        const response = await fetch(URL, {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error("Erro ao carregar agendamentos do servidor")
        }

        const data = await response.json()

        const selectedDate = document.querySelector("#date").value

        renderSchedules(data, selectedDate)

        return data

    } catch (error) {
        console.error("Falha na busca.", error)
    }
}

export async function createSchedules() {

    const clientName = document.querySelector('[name="clientName"]').value.trim()
    const petName = document.querySelector('[name="petName"]').value.trim()
    const phone = document.querySelector('[name="phone"]').value.trim()
    const service = document.querySelector('[name="service"]').value.trim()

    const dateValue = document.querySelector("[name=when]").value
    const hour = document.querySelector("[name=hour]").value

    const petSchedule = {
        clientName: clientName,
        petName: petName,
        phone: phone,
        service: service,
        when: dateValue,
        hour: hour
    }

    try {
        const response = await fetch("http://localhost:3333/petSchedules", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(petSchedule)
        })

        if (response.status === 201) {
            alert("Agendamento criado com sucesso!")
            loadSchedules()

            return true
        } else {
            const errorData = await response.json()
            throw new Error(errorData.error || "Erro desconhecido ao agendar")
        }

    } catch (error) {
        console.error('Falha no agendamento:', error)
        alert(`Erro ao agendar: ${error.message}`)
    }

}