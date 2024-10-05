/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Timeline } from "../components/booking/Timeline";
import { useGetAllDocks } from "../hooks/useGetAllDocks";
import { getReservationsForLocalDate } from "../components/booking/getExistingReservationsOfSelectedDate";
import { getDockId } from "../components/booking/getDockId";
import SelectDate from "../components/booking/SelectDate";
import ReservationForm from "../components/booking/ReservationForm";
import { useGetAllBooking } from "../hooks/useGetAllBooking";
import { getSingleLoadUnloadTime } from "../components/booking/getSingleLoadUnloadTime";
import useAxiosIntercept from "../hooks/useAxiosIntercept";

const TestTheGridFromDB2 = () => {
    const axiosPrivate = useAxiosIntercept();
    const { auth } = useAuth();
    const [showDate, setShowDate] = useState('')
    const [showSelectedDateTime, setShowSelectedDateTime] = useState("")
    const [allReservationsOfTheSelectedDate, setAllReservationsOfTheSelectedDate] = useState([])
    const allDocks = useGetAllDocks();
    const allBookingCreatedEver = useGetAllBooking();
    const [ showNotAvailableDock, setShowNoAvailableDock ] = useState(false)

    useEffect(() => {
        setAllReservationsOfTheSelectedDate(getReservationsForLocalDate(allBookingCreatedEver, showDate))
    }, [allBookingCreatedEver, showDate])


    const [material, setMaterial] = useState('');
    const [containerSize, setContainerSize] = useState(40);
    const [loadedWithPallete, setLoadedWithPallete] = useState(false);

    const handleFindAvailableBookingSlot = async () => {
        console.log({
            material,   // it is an id   of the collection where -> REF Parts	A	66fd2461704eb147562c84e5
            containerSize, // 40
            loadedWithPallete  // true
        })
        const singleLoadUnloadTime = await getSingleLoadUnloadTime(material, containerSize, loadedWithPallete, axiosPrivate)
        console.log("single load unload time", singleLoadUnloadTime)
        const localDate = new Date(showDate);
        const bookingDate = new Date(localDate)
        bookingDate.setUTCHours(0, 0, 0, 0)
        bookingDate.setHours(bookingDate.getHours() - 6);

        const availableDockId = getDockId(showSelectedDateTime, singleLoadUnloadTime.requiredTime, singleLoadUnloadTime.stationForMaterial.stationType, allReservationsOfTheSelectedDate, allDocks)
        // this is the actual data to be sent backend
        if (availableDockId) {
            const newReserv = {
                user: auth?.user_id,
                bookingDate,
                startTime: showSelectedDateTime,
                endTime: new Date(showSelectedDateTime.getTime() + singleLoadUnloadTime.requiredTime * 60 * 1000),
                loadUnloadTime: singleLoadUnloadTime._id,
                status: "pending",
                dockId: getDockId(showSelectedDateTime, singleLoadUnloadTime.requiredTime, singleLoadUnloadTime.stationForMaterial.stationType, allReservationsOfTheSelectedDate, allDocks)
            }

            try {
                const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_SERVER}/booking`,
                    JSON.stringify(newReserv),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                );
                console.log("server data", response.data)
                // Flatten the previous data into one array and append the new booking
                const previousbookingData = [...allReservationsOfTheSelectedDate];  // Avoid structuredClone, spread instead
                setAllReservationsOfTheSelectedDate([...previousbookingData, {...response.data}]);
            } catch (error) {
                console.log(error)
            }
        } else {
            setShowNoAvailableDock(true);
        }


        // now testing for merging new booking data with the existing data
        // const dockId = await allDocks?.find(dock => dock._id === getDockId(showSelectedDateTime, singleLoadUnloadTime.requiredTime, singleLoadUnloadTime.stationForMaterial.stationType, allReservationsOfTheSelectedDate, allDocks))
        // const newReserve = {
        //     user: auth?.user_id,
        //     bookingDate,
        //     startTime: showSelectedDateTime,
        //     endTime: new Date(showSelectedDateTime.getTime() + singleLoadUnloadTime.requiredTime * 60 * 1000),
        //     loadUnloadTime: singleLoadUnloadTime,
        //     status: "pending",
        //     dockId
        // }
        // console.log(newReserve)
        // const previousbookingData = structuredClone(allReservationsOfTheSelectedDate)
        // setAllReservationsOfTheSelectedDate([...previousbookingData, newReserve])

        
    }


    return (
        <>
            <SelectDate setShowSelectedDateTime={setShowSelectedDateTime} setShowDate={setShowDate} setShowNoAvailableDock={setShowNoAvailableDock}/>
            <br />
            <br />
            <ReservationForm
                showSelectedDateTime={showSelectedDateTime}
                material={material}
                setMaterial={setMaterial}
                containerSize={containerSize}
                setContainerSize={setContainerSize}
                loadedWithPallete={loadedWithPallete}
                setLoadedWithPallete={setLoadedWithPallete}
            />
            <br />
            <Button variant="contained" onClick={() => handleFindAvailableBookingSlot()}>Proceed to Booking</Button>
            {
                showNotAvailableDock && (
                    <div className="text-red-600 border border-blue-600 rounded-2xl my-4 p-4">
                        <Typography variant='h4'>No available dock is found at your requested time.</Typography>
                        <Typography variant='h6'>Please try with another time.</Typography>
                    </div>
                )
            }
            {
                showDate && <Timeline allReservationsOfTheSelectedDate={allReservationsOfTheSelectedDate} docks={allDocks} showDate={showDate} />
            }
        </>
    );
};

export default TestTheGridFromDB2;