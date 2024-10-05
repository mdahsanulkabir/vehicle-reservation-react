export function validateAndConvertDate(dateInput, timeInput) {
    // Check if the date is valid
    const dateParts = dateInput.split('-');
    if (dateParts.length !== 3 || isNaN(Date.parse(dateInput))) {
        throw new Error('Invalid date format. Use YYYY-MM-DD.');
    }

    // Check if time is valid
    const timeParts = timeInput.split(':');
    if (timeParts.length !== 2 || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
        throw new Error('Invalid time format. Use HH:MM.');
    }

    // Combine and convert to UTC
    const combinedLocalDateTime = `${dateInput}T${timeInput}:00`;
    const localDateTime = new Date(combinedLocalDateTime);

    // Ensure it was parsed correctly
    if (isNaN(localDateTime.getTime())) {
        throw new Error('Date could not be parsed.');
    }

    return new Date(localDateTime.toISOString());
}
