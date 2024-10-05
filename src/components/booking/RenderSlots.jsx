const RenderSlots = ({dock, docksReservationDataOfCurrentDate, slotSize}) => {
    const timeSlots = Array.from({ length: 24*60/slotSize }, (_, i) => i * slotSize);
    return timeSlots.map((timeSlot) => {

        // iteration is based on checking status of each timeSlot

        // slot time will take the numeric value of each time slots, and using below 'slotTime' we can get the STARTING TIME of that slot
        const slotTime = new Date(new Date(docksReservationDataOfCurrentDate.date).setHours(0, 0, 0, 0) + timeSlot * 60 * 1000);


        // in the database, the data is primarily divided into docs (1 - 11)
        // below code takes a dock and in that dock - finds the STARTING TIME and ENDING IME of the reservation.
        // As we are in the current time slot, the algorithm checks, 
        // whether the current time slot iteration falls any of the reserved slot
        const isReserved = dock.dockReservations.some((dockReservation) => {

            // iteration goes through each of the reservations
            // checks if that slot's starting time is ( 
            //          1.    equal or later than the current reseravation starting time 
            //          2.    && earlier than the reservation end time)
            //              if both are true, then it returns TRUE, 
            //              which means, this time slot is reserved
            const resStart = new Date(dockReservation.start);
            const resEnd = new Date(dockReservation.end);
            return slotTime >= resStart && slotTime < resEnd;
        });

        // Check if it's the current time slot start of any reservation to render the label as per our style
        const isStartOfReservation = dock.dockReservations.some((dockReservation) => {
            const resStart = new Date(dockReservation.start);
            return slotTime.getTime() === resStart.getTime();  // Date.getTime() -> returns number of milliseconds since midnight at the beginning of January 1, 1970, UTC
        });

        return (
            <div
                key={`${dock.id}-${timeSlot}`}
                className={`time-slot ${isReserved ? 'reserved' : 'available'}`}
            >
                {isStartOfReservation && isReserved ? 'R' : ''}
            </div>
        );
    });
};

export default RenderSlots;