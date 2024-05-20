export const getCurrentDateUser = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    return currentDate;
}

export const getCurrentTimeUser = () => {
    const now = new Date();
    let hour = now.getHours();
    const minute = String(now.getMinutes()).padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12;
    hour = String(hour).padStart(2, '0');

    const currentTime = `${hour}:${minute} ${ampm}`;

    return currentTime;
}