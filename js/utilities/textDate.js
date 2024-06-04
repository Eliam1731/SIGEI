export const dateInFormatText = (dateString) => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    let [ year, month, day ] = dateString.split('-');
    let date = new Date(year, month - 1, day);

    day = date.getDate();
    month = months[date.getMonth()];
    year = date.getFullYear();

    return `${day} de ${month} del ${year}`;
}