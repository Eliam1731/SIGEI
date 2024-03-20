export const setCurrentDateCalendary = ( element ) => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let maxDate = `${year}-${month}-${day}`;

    element.max = maxDate;
}