const morningSection = document.querySelector(".morning")
const afternoonSection = document.querySelector(".afternoon")
const nightSection = document.querySelector(".night")

function clearSchedules() {
    morningSection.innerHTML = ''
    afternoonSection.innerHTML = ''
    nightSection.innerHTML = ''
}

function createScheduleItem(schedule) {

    const scheduleTime = dayjs(schedule.when).format("HH:mm")

    return ` <p><strong>${scheduleTime} ${schedule.petName}</strong> / ${schedule.clientName}</p> <p>${schedule.service}</p> `
}

export const renderSchedules = (data, selectedDate) => {

    clearSchedules()

    if(!data || data.length === 0) {
        return
    }


    const filteredSchedules = data.filter(schedule => {
        const targetDate = dayjs(selectedDate).format("YYYY-MM-DD")

        const scheduleDate = dayjs(schedule.when).format("YYYY-MM-DD")

        return scheduleDate === targetDate
    })

    if (filteredSchedules.length === 0) {
        console.log(`Nenhum agendamento para ${selectedDate}`)
        return
    }

    filteredSchedules.forEach(schedule => {

        const scheduleCardHTML = createScheduleItem(schedule)

        const hourString = schedule.hour
        const hour = parseInt(hourString.split(":")[0])

        if(isNaN(hour)) {
            console.error("Erro: Hour é NaN. Verifique o valor de schedule.hour no MongoDB.", schedule)
            return
        }

        let sectionToRender = null

        if (hour >= 8 && hour <= 11) {
            sectionToRender = morningSection

        } else if (hour >= 14 && hour <= 17) {
            sectionToRender = afternoonSection

        } else if (hour > 17 && hour <= 20) {
            sectionToRender = nightSection

        } else {

            return
        }

        if (sectionToRender) {
            sectionToRender.innerHTML += scheduleCardHTML
        }
    })
}