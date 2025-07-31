// client/js/utilities/textDate.js
export function dateInFormatText(isoDate) {
    if (!isoDate || isoDate === '0000-00-00') return '';
    const [year, month, day] = isoDate.split('-').map(Number);
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${day} de ${meses[month - 1]} del ${year}`;
  }
  