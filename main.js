const activities = document.querySelectorAll('.title')
const menuItems = document.querySelectorAll('.profile__item')
const currentHours = document.querySelectorAll('.activity__hours');
const previousHours = document.querySelectorAll('.activity__previous')
const fetching = async () => {
    const response = await fetch('./data.json');
    if (response.ok) {
        return await response.json()
    }
}
const fetchProcessing = (request, callbackTitle) => {
    let id = 0;
    for (const item of request) {
        callbackTitle(item.title, id)
        id++;
    }
}
const addTitle = (title, id) => {
    activities[id].textContent = title;
}
const changeTime = (activity, time, id) => {
    console.log(activity)
    //console.log( currentHours[id].timeframes)

    currentHours[id].textContent = activity.current + 'hrs'
    previousHours[id].textContent = `Last ${time} - ` + activity.previous + 'hrs'

    //console.log(activity)

}
fetching().then(result => fetchProcessing(result, addTitle));

const changeToDaily = async () => {
    const data = await fetching()
    data.forEach((time, id) => {
        console.log()
        changeTime(time.timeframes.daily, 'Day', id)
    })

}

const changeToWeekly = async () => {
    const data = await fetching()
    data.forEach((time, id) => {
        console.log()
        changeTime(time.timeframes.weekly, 'Week', id)
    })
}
const changeToMonthly = async () => {
    const data = await fetching()
    data.forEach((time, id) => {
        changeTime(time.timeframes.monthly, 'Month', id)
    })
}

const changeDate = (type) => {
    const date = type.textContent.trim()
    //console.log(date)
    if (date === 'Weekly') {
        changeToWeekly()
    } else if (date === 'Monthly') {
        changeToMonthly()
    } else if (date === 'Daily') {
        changeToDaily()
    }

}


menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        changeDate(menuItem)
    })
})
