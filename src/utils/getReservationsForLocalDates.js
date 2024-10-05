const reservationData = [
    {
        id: 'sdfsssvsv',
        date: '2024-10-26T18:59:59z',
        docks: [
            {
                id: 1,
                name: 'Dock 1',
                dockReservations: [
                    { id: 'ab', start: '2024-10-27T09:00', end: '2024-10-27T10:30' }, // 1.5 hours
                    { id: 'ak', start: '2024-10-27T12:00', end: '2024-10-27T14:30' }, // 2.5 hours
                    { id: 'a6', start: '2024-10-27T16:00', end: '2024-10-27T17:00' }  // 1 hour
                ]
            },
            {
                id: 2,
                name: 'Dock 2',
                dockReservations: [
                    { id: 'ba', start: '2024-10-27T08:00', end: '2024-10-27T09:30' }, // 1.5 hours
                    { id: 'b', start: '2024-10-27T11:00', end: '2024-10-27T13:30' }, // 2.5 hours
                    { id: 'bc', start: '2024-10-27T15:00', end: '2024-10-27T16:00' }  // 1 hour
                ]
            },
            {
                id: 3,
                name: 'Dock 3',
                dockReservations: [
                    { id: 'aasc', start: '2024-10-27T07:30', end: '2024-10-27T08:30' }, // 1 hour
                    { id: 'aghc', start: '2024-10-27T09:30', end: '2024-10-27T12:00' }, // 2.5 hours
                    { id: 'akjc', start: '2024-10-27T13:00', end: '2024-10-27T14:30' }  // 1.5 hours
                ]
            },
            {
                id: 4,
                name: 'Dock 4',
                dockReservations: [
                    { id: 'aertc', start: '2024-10-27T08:00', end: '2024-10-27T09:00' }, // 1 hour
                    { id: 'alklc', start: '2024-10-27T10:00', end: '2024-10-27T12:30' }, // 2.5 hours
                    { id: 'acbcbc', start: '2024-10-27T14:00', end: '2024-10-27T15:30' }  // 1.5 hours
                ]
            }
        ]
    },
    {
        id: 'sdfsssvsv',
        date: '2024-10-28T00:00',
        docks: [
            {
                id: 1,
                name: 'Dock 1',
                dockReservations: [
                    { id: 'ba', start: '2024-10-28T08:00', end: '2024-10-28T09:30' }, // 1.5 hours
                    { id: 'b', start: '2024-10-28T11:00', end: '2024-10-28T13:30' }, // 2.5 hours
                    { id: 'bc', start: '2024-10-28T15:00', end: '2024-10-28T16:00' }  // 1 hour
                ]
            },
            {
                id: 2,
                name: 'Dock 2',
                dockReservations: [
                    { id: 'ab', start: '2024-10-28T09:00', end: '2024-10-28T10:30' }, // 1.5 hours
                    { id: 'ak', start: '2024-10-28T12:00', end: '2024-10-28T14:30' }, // 2.5 hours
                    { id: 'a6', start: '2024-10-28T16:00', end: '2024-10-28T17:00' }  // 1 hour
                ]
            },
            {
                id: 3,
                name: 'Dock 3',
                dockReservations: [
                    { id: 'aertc', start: '2024-10-28T08:00', end: '2024-10-28T09:00' }, // 1 hour
                    { id: 'alklc', start: '2024-10-28T10:00', end: '2024-10-28T12:30' }, // 2.5 hours
                    { id: 'acbcbc', start: '2024-10-28T14:00', end: '2024-10-28T15:30' }  // 1.5 hours
                ]
            },
            {
                id: 4,
                name: 'Dock 4',
                dockReservations: [
                    { id: 'aasc', start: '2024-10-28T07:30', end: '2024-10-28T08:30' }, // 1 hour
                    { id: 'aghc', start: '2024-10-28T09:30', end: '2024-10-28T12:00' }, // 2.5 hours
                    { id: 'akjc', start: '2024-10-28T13:00', end: '2024-10-28T14:30' }  // 1.5 hours
                ]
            }
        ]
    },

]

export const getReservationsForLocalDate = (date) => {
    const localDate = new Date(date); // e.g., new Date('2024-10-03') -> Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)
    const startOfLocalDayUTC = new Date(localDate); //new Date(Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)) -> Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)
    startOfLocalDayUTC.setUTCHours(0, 0, 0, 0); // Start of local day (00:00 local time) >>>>>> startOfLocalDayUTC = Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)
    startOfLocalDayUTC.setHours(startOfLocalDayUTC.getHours() - 6); // Convert to UTC (Dhaka is UTC+6) >>>>>>>>>> startOfLocalDayUTC =  Thu Oct 03 2024 00:00:00 GMT+0600 (Bangladesh Standard Time)

    const endOfLocalDayUTC = new Date(localDate);// endOfLocalDayUTC = Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)
    endOfLocalDayUTC.setUTCHours(23, 59, 59, 999); // End of local day (23:59 local time) >>>>>>>>>>>>>    endOfLocalDayUTC = Fri Oct 04 2024 05:59:59 GMT+0600 (Bangladesh Standard Time)
    endOfLocalDayUTC.setHours(endOfLocalDayUTC.getHours() - 6); // Convert to UTC  >>>>>  endOfLocalDayUTC =  Thu Oct 03 2024 23:59:59 GMT+0600 (Bangladesh Standard Time)

    return reservationData.filter(data => {
        const reservationDateUTC = new Date(data.date);
        return reservationDateUTC >= startOfLocalDayUTC && reservationDateUTC <= endOfLocalDayUTC;
    });
};

const reservationsOnOct3 = getReservationsForLocalDate('2024-10-27');
// console.log(reservationsOnOct3.forEach(x => x.docks));
reservationsOnOct3.forEach(x => console.log(x.docks))
