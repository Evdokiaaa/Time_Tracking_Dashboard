const activities = document.querySelectorAll('.title')
const menuItems = document.querySelectorAll('.profile__item')
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
fetching().then(result => fetchProcessing(result, addTitle));

//Todo Вот эти функци на завтра
const changeToWeekly = () => {
}
const changeToMonthly = () => {
}

const changeDate = (type) => {
    const date = type.textContent.trim()
    console.log(date)
    if (date === 'Weekly') {
        changeToWeekly()
    } else if (date === 'Monthly') {
        changeToMonthly()
    }

}


menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        changeDate(menuItem)
    })
})
