/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";

const docks = [
    {
        id: 1,
        name: 'Dock 1',
        reservations: [
            { id: 'ab', start: '2024-09-27T09:00', end: '2024-09-27T10:30' }, // 1.5 hours
            { id: 'ak', start: '2024-09-27T12:00', end: '2024-09-27T14:30' }, // 2.5 hours
            { id: 'a6', start: '2024-09-27T16:00', end: '2024-09-27T17:00' }  // 1 hour
        ]
    },
    {
        id: 2,
        name: 'Dock 2',
        reservations: [
            { id: 'ba', start: '2024-09-27T08:00', end: '2024-09-27T09:30' }, // 1.5 hours
            { id: 'b', start: '2024-09-27T11:00', end: '2024-09-27T13:30' }, // 2.5 hours
            { id: 'bc', start: '2024-09-27T15:00', end: '2024-09-27T16:00' }  // 1 hour
        ]
    },
    {
        id: 3,
        name: 'Dock 3',
        reservations: [
            { id: 'aasc', start: '2024-09-27T07:30', end: '2024-09-27T08:30' }, // 1 hour
            { id: 'aghc', start: '2024-09-27T09:30', end: '2024-09-27T12:00' }, // 2.5 hours
            { id: 'akjc', start: '2024-09-27T13:00', end: '2024-09-27T14:30' }  // 1.5 hours
        ]
    },
    {
        id: 4,
        name: 'Dock 4',
        reservations: [
            { id: 'aertc', start: '2024-09-27T08:00', end: '2024-09-27T09:00' }, // 1 hour
            { id: 'alklc', start: '2024-09-27T10:00', end: '2024-09-27T12:30' }, // 2.5 hours
            { id: 'acbcbc', start: '2024-09-27T14:00', end: '2024-09-27T15:30' }  // 1.5 hours
        ]
    }
];


const Timeline = ({ docks }) => {
    // Generate all 15-minute intervals for a day (0 to 95)
    const timeSlots = Array.from({ length: 96 }, (_, i) => i * 15); // Each index represents a 15-minute interval

    const renderSlots = (dock) => {
        return timeSlots.map((timeSlot) => {
            const slotTime = new Date(new Date('2024-09-27').setHours(0, 0, 0, 0) + timeSlot * 60 * 1000);

            const isReserved = dock.reservations.some((reservation) => {
                const resStart = new Date(reservation.start);
                const resEnd = new Date(reservation.end);
                return slotTime >= resStart && slotTime < resEnd;
            });

            // Check if it's the start of a reservation to render the label
            const isStartOfReservation = dock.reservations.some((reservation) => {
                const resStart = new Date(reservation.start);
                return slotTime.getTime() === resStart.getTime();
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

    return (
        <div className="timeline">
            <div className="timeline-header">
                <div className="dock-header">Dock</div>
                {Array.from({ length: 24 }, (_, hour) => (
                    <div key={`header-${hour}`} className="hour-header">
                        {hour}:00
                    </div>
                ))}
            </div>
            {docks.map((dock) => (
                <div key={dock.id} className="dock-row">
                    <div className="dock-name">{dock.name}</div>
                    {renderSlots(dock)}
                </div>
            ))}
        </div>
    );
};









const BookingImport = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

    console.log(dayjs(selectedDate)[`$d`])

    // const shouldDisableTime = (timeValue, view) => {
    //     if (view === 'hours') {
    //         return timeValue <= 9 || timeValue > 10; // Disable hours outside 9 AM - 5 PM
    //     }
    //     if (view === 'minutes') {
    //         return timeValue !== 0 && timeValue !== 30; // Allow only 0 and 30 minutes
    //     }
    //     return false; // Allow all other times
    // };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Typography variant='h6'>Book a schedule (7 am - 3 pm)</Typography>

            <StaticDateTimePicker
                sx={{ maxWidth: '200px', maxHeight: '500px', scale: 0.75, border: '1px solid gray' }}
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                disablePast

                ampm={false}
            // shouldDisableTime={shouldDisableTime}


            // slotProps={{
            //     actionBar: {
            //         actions: ['clear']
            //     }
            // }}
            // shouldDisableTime={(value, view) => {
            //     if (view === 'hours') {
            //         return value.hour() < 7 && value.hour() > 15
            //     }
            // }}
            />

            <p>Selected time = {`${dayjs(selectedDate).toDate()}`}</p>
            <p>Selected time = {`${dayjs("2024-09-27T09:00").toDate()}`}</p>



            <p>Selected time = {`${new Date(dayjs(selectedDate).add(60, 'minute'))}`}</p>


            <br />
            <br />

            <Timeline docks={docks} />
        </LocalizationProvider>
    );
};

export default BookingImport;