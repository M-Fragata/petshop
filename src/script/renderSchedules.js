import dayjs from "dayjs"

function clearSchedules() {
    document.querySelector('.morning .main-schedules').innerHTML = ''
    document.querySelector('.afternoon .main-schedules').innerHTML = ''
    document.querySelector('.night .main-schedules').innerHTML = ''
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
        return
    }

    filteredSchedules.forEach(schedule => {
        const hour = dayjs(schedule.when).hour()
        let sectionSelector = ""

        if (hour >= 8 && hour <= 11) {
            sectionSelector = ".morning .main-schedules"
        } else if (hour >= 13 && hour <= 17) {
            sectionSelector = ".afternoon .main-schedules"
        } else if (hour > 17 && hour <= 20) {
            sectionSelector = ".night .main-schedules"
        } else {
            return
        }

        const section = document.querySelector(sectionSelector)

        if (section) {
            section.innerHTML += createScheduleItem(schedule)
        }

    })

}