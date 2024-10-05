// this file will be used to get all the reservations/bookings which are listed
// also, these reservations will be grouped by stations, and subgrouped by docks

export const getReservationsForLocalDate = (data, date) => {
    const localDate = new Date(date); // e.g., new Date('2024-10-03') -> Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)
    const startOfLocalDayUTC = new Date(localDate); //new Date(Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)) -> Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)
    startOfLocalDayUTC.setUTCHours(0, 0, 0, 0); // Start of local day (00:00 local time) >>>>>> startOfLocalDayUTC = Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)
    startOfLocalDayUTC.setHours(startOfLocalDayUTC.getHours() - 6); // Convert to UTC (Dhaka is UTC+6) >>>>>>>>>> startOfLocalDayUTC =  Thu Oct 03 2024 00:00:00 GMT+0600 (Bangladesh Standard Time)

    const endOfLocalDayUTC = new Date(localDate);// endOfLocalDayUTC = Thu Oct 03 2024 06:00:00 GMT+0600 (Bangladesh Standard Time)
    endOfLocalDayUTC.setUTCHours(23, 59, 59, 999); // End of local day (23:59 local time) >>>>>>>>>>>>>    endOfLocalDayUTC = Fri Oct 04 2024 05:59:59 GMT+0600 (Bangladesh Standard Time)
    endOfLocalDayUTC.setHours(endOfLocalDayUTC.getHours() - 6); // Convert to UTC  >>>>>  endOfLocalDayUTC =  Thu Oct 03 2024 23:59:59 GMT+0600 (Bangladesh Standard Time)

    return data.filter(singleData => {
        const reservationDateUTC = new Date(singleData.bookingDate);
        return reservationDateUTC >= startOfLocalDayUTC && reservationDateUTC <= endOfLocalDayUTC;
    });
};