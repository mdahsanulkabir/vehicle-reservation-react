/* eslint-disable react/prop-types */
// this component is used to draw timeline

import { Typography } from "@mui/material";

export const Timeline = ({ allReservationsOfTheSelectedDate, docks, bookingDate }) => {

    const reservationsAsPerDocks = docks.map(dock => {
        const currentDock = {
            _id: dock._id,
            dockNumber: dock.dockNumber,
            stationType: dock.stationType,
            dockReservations: allReservationsOfTheSelectedDate.filter(reservationOfSelectedDate => reservationOfSelectedDate.dockId._id === dock._id)
            // TODO -> if there is not aailable dock, Line 11 creates error
        }
        // console.log("current Dock: ", currentDock)
        // currentDock.dockReservations.map(reservation => console.log("reservation booking date:  ", reservation.bookingDate))
        return currentDock;
    })
    console.log("reservations as per docks : ", reservationsAsPerDocks)
    // console.log(allReservationsOfTheSelectedDate)
    // const docks = allReservationsOfTheSelectedDate        // docks = reservation array of the selected date
    // Generate all 15-minute intervals for a day (0 to 95)
    const timeSlots = Array.from({ length: 96 }, (_, i) => i * 15); // Each index represents a 15-minute interval
    // console.log(timeSlots)
    // a day is divided in to 15 minutes for each time slots, so there are 96 time slots 
    //   [
    //   0, 15, 30, 45, 60, 75, 90, 105, 
    //  120, 135, 150, 165, 180, 195, 210, 225,
    //   240, 255, 270, 285, 300, 315, 330, 345,
    //   360, 375, 390, 405, 420, 435, 450, 465, 
    //  480, 495, 510, 525, 540, 555, 570, 585, 
    //  600, 615, 630, 645, 660, 675, 690, 705, 
    //  720, 735, 750, 765, 780, 795, 810, 825, 
    //  840, 855, 870, 885, 900, 915, 930, 945, 
    //  960, 975, 990, 1005, 1020, 1035, 1050, 1065, 
    //  1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 
    //  1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305, 
    //  1320, 1335, 1350, 1365, 1380, 1395, 1410, 1425 
    //  ]



    // This function is returning a div with color and text, 
    // based on the condition that this unit slot is reserved or not.
    // a slot is represented as a unit of whole day (for station A and B, it's 15 minute)
    const renderSlots = (dock) => {
        return timeSlots.map((timeSlot) => {

            // iteration is based on checking status of each timeSlot

            // slot time will take the numeric value of each time slots, and using below 'slotTime' we can get the STARTING TIME of that slot
            const currentSlotStartTime = new Date(new Date(bookingDate).setHours(0, 0, 0, 0) + timeSlot * 60 * 1000);
            // const currentSlotStartTime = new Date(new Date('2024-10-27').setHours(0, 0, 0, 0) + timeSlot * 60 * 1000);



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
                const resStart = new Date(dockReservation.startTime);
                const resEnd = new Date(dockReservation.endTime);
                return currentSlotStartTime >= resStart && currentSlotStartTime < resEnd;
            });

            // Check if it's the current time slot start of any reservation to render the label as per our style
            const isStartOfReservation = dock.dockReservations.some((dockReservation) => {
                const resStart = new Date(dockReservation.startTime);
                return currentSlotStartTime.getTime() === resStart.getTime();  // Date.getTime() -> returns number of milliseconds since midnight at the beginning of January 1, 1970, UTC
            });

            return (
                <div
                    key={`${dock._id}-${timeSlot}`}
                    id={`${dock._id}-${timeSlot}`}
                    className={`time-slot ${isReserved ? 'reserved' : 'available'}`}
                >
                    {isStartOfReservation && isReserved ? 'R' : ''}
                </div>
            );
        });
    };



    return (
        <div className="my-8">
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{`Reservation distribution on ${bookingDate}`}</Typography>
            <div className="timeline">
                <div className="timeline-header">
                    <div className="dock-header">Dock</div>
                    {Array.from({ length: 24 }, (_, hour) => (
                        <div key={`header-${hour}`} className="hour-header">
                            {hour}:00
                        </div>
                    ))}
                </div>
                {
                    reservationsAsPerDocks.map((dock) => {
                        return (
                            <div key={dock._id} className="dock-row">
                                <div className="dock-name">{`Dock ${dock.dockNumber}`}</div>
                                {renderSlots(dock)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};
