// this function will be used to get available dock id for new booking, considering the booking should be under a station type and has a duration of loading/unloading

export const getDockId = (requestedStartTime, duration, stationType, allReservationsOfTheSelectedDate, allDocks) => {

    
    const slotsRequired = Math.ceil(duration / 15);
    const requestStartingMinuteOfTheDay = Math.floor(Math.floor((requestedStartTime - new Date(new Date(requestedStartTime).setHours(0, 0, 0, 0))) / (1000 * 60)) / 15) * 15
    const requestedTimeSlots = Array.from({ length: slotsRequired }, (_, i) => i * 15 + requestStartingMinuteOfTheDay)
    const docksDataOfStationType = allReservationsOfTheSelectedDate.filter(reservationOfSelectedDate => reservationOfSelectedDate.dockId.stationType === stationType)

    console.log("Docks data of station type: ", stationType, " are : ", docksDataOfStationType)

    const reservationsAsPerDocks = []
    allDocks.map(dock => {
        if (dock.stationType === stationType) {
            const currentDock = {
                _id: dock._id,
                dockNumber: dock.dockNumber,
                stationType: dock.stationType,
                dockReservations: docksDataOfStationType.filter(reservationOfCurrentDock => reservationOfCurrentDock.dockId._id === dock._id)
            }
            // console.log("current Dock: ", currentDock)
            // currentDock.dockReservations.map(reservation => console.log("reservation booking date:  ", reservation.bookingDate))
            reservationsAsPerDocks.push(currentDock);
        }
    })
    console.log("Docks data of station type: ", reservationsAsPerDocks)
    let dockId = ""
    reservationsAsPerDocks.forEach(dock => {
        console.log(dock)

        let shouldCheckNextDock = false;

        for (const timeSlot of requestedTimeSlots) {

            const currentSlotStartTime = new Date(new Date(requestedStartTime).setHours(0, 0, 0, 0) + timeSlot * 60 * 1000);

            const isReserved = dock.dockReservations.some((dockReservation) => {
                const resStart = new Date(dockReservation.startTime);
                const resEnd = new Date(dockReservation.endTime);
                return currentSlotStartTime >= resStart && currentSlotStartTime < resEnd;
            });

            if (isReserved) {
                console.log("Specified time cannot be allocated in Dock number ", dock.dockNumber, " due to other reservation");
                shouldCheckNextDock = true;
                break; // Exit inner loop if reserved
            }
        }

        // If none of the time slots are reserved, log that the dock can be selected
        if (!shouldCheckNextDock) {
            console.log("You can select Dock number ", dock.dockNumber);
            dockId = dock._id
            reservationsAsPerDocks.length = 0;
        }
    })

    return dockId;
}
