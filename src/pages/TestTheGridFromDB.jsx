/* eslint-disable react/prop-types */

import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { reservationData } from "../data/reservation";
import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosIntercept from "../hooks/useAxiosIntercept";

// const stations = {
//     A: ["dock1", "dock2", "dock3", "dock4", "dock5", "dock6", "dock7", "dock8"],
//     B: ["dock9", "dock10", "dock11"],
//     C: ["dock12", "dock13", "dock14", "dock15"],
//     D: ["dock16"]
// }

const Timeline = ({ docksReservationDataOfCurrentDate }) => {
    console.log(docksReservationDataOfCurrentDate?.docks)
    const docks = docksReservationDataOfCurrentDate?.docks
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
            const currentSlotStartTime = new Date(new Date(docksReservationDataOfCurrentDate.date).setHours(0, 0, 0, 0) + timeSlot * 60 * 1000);


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
                return currentSlotStartTime >= resStart && currentSlotStartTime < resEnd;
            });

            // Check if it's the current time slot start of any reservation to render the label as per our style
            const isStartOfReservation = dock.dockReservations.some((dockReservation) => {
                const resStart = new Date(dockReservation.start);
                return currentSlotStartTime.getTime() === resStart.getTime();  // Date.getTime() -> returns number of milliseconds since midnight at the beginning of January 1, 1970, UTC
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
            {docks.map((dock) => {
                return (
                    <div key={dock.id} className="dock-row">
                        <div className="dock-name">{dock.name}</div>
                        {renderSlots(dock)}
                    </div>
                )
            })}
        </div>
    );
};

const TestTheGridFromDB = () => {
    const axiosPrivate = useAxiosIntercept();
    const { auth } = useAuth();
    console.log(auth)
    // console.log(reservationData)
    const [showDate,] = useState('2024-10-27T00:00')
    // const [inputDate, setInputDate] = useState('2024-10-27T00:00')
    const dateRef = useRef('');
    const timeRef = useRef('');
    const [showError, setShowError] = useState(false)
    const [showSelectedDateTime, setShowSelectedDateTime] = useState(false)


    useEffect(() => {
        const loadData = async () => {
            const response = await axiosPrivate.get(`${import.meta.env.VITE_BACKEND_SERVER}/booking`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            console.log({
                dbData: response.data.map(item => ({
                    ...item,
                    bookingDate: new Date(item.bookingDate).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
                    startTime: new Date(item.startTime).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
                    endTime: new Date(item.endTime).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
                }))
            })
        }
        loadData();
    }, [axiosPrivate])

    const docksReservationDataOfCurrentDate = reservationData?.find(data => data.date === showDate)

    // if (!docksReservationDataOfCurrentDate) {
    //     console.log(docksReservationDataOfCurrentDate+"T00:00")
    //     return <h1>No data found in selected date</h1>
    // }

    const handleDateChange = () => {
        const selectedDate = dateRef.current.value + "T" + timeRef.current.value; // Access the input value through the ref
        const reservationSchedule = new Date(selectedDate)


        if (reservationSchedule.getHours() > 15 || reservationSchedule.getHours() < 7) {
            console.log("You are trying to schedule beyond allowed time.")
            setShowError(true)
            return null;
        } else {
            setShowSelectedDateTime(reservationSchedule)
        }

        if (selectedDate) {
            //setShowDate(selectedDate + 'T00:00'); // Set the date with time as midnight in local time
            console.log('Selected Date time:', reservationSchedule);

        } else {
            console.log('No date selected');
        }
    };
    const [material, setMaterial] = useState('');
    const handleMaterialChange = (e) => {
        setMaterial(e.target.value);
    };

    const [containerSize, setContainerSize] = useState(40);
    const handleContainerSizeChange = (e) => {
        setContainerSize(e.target.value);
    };

    const [loadedWithPallete, setLoadedWithPallete] = useState(false);

    const handleLoadedWithPalleteChange = (e) => {
        setLoadedWithPallete(e.target.checked);
    };


    return (
        <>
            {
                showError && (
                    <div className="absolute top-[500px] left-[500px] z-30 border border-x-lime-800 flex flex-col text-center">
                        <h1>Your schedule time is not ok</h1>
                        <Button variant="contained" onClick={() => setShowError(false)}>OK</Button>
                    </div>
                )
            }
            <div>Select your schedule time</div>
            <div className="flex gap-4">

                <input type="date" ref={dateRef} />
                <input type="time" ref={timeRef} />
            </div>
            <Button variant="contained" onClick={handleDateChange}>Select The Date</Button>

            <br />
            <br />

            <FormControl fullWidth>
                <InputLabel id="select-material-label">Select material type</InputLabel>
                <Select
                    labelId="select-material-label"
                    id="select-material"
                    value={material}
                    label="Material"
                    onChange={e => handleMaterialChange(e)}
                >
                    <MenuItem value={"66fd242f704eb147562c84e2"}>Metal Sheet</MenuItem>
                    <MenuItem value={"66fd2461704eb147562c84e5"}>Ref Parts</MenuItem>
                    <MenuItem value={"66fd26e5cfb1ce3bb614391c"}>TV parts</MenuItem>
                </Select>
            </FormControl>
            <br />
            <br />
            <br />
            <FormControl fullWidth>
                <InputLabel id="select-containerSize-label">Select Container Size</InputLabel>
                <Select
                    labelId="select-containerSize-label"
                    id="select-containerSize"
                    value={containerSize}
                    label="Container Size"
                    onChange={e => handleContainerSizeChange(e)}
                >
                    <MenuItem value={40}>40 ft</MenuItem>
                    <MenuItem value={23}>23 ft</MenuItem>
                    <MenuItem value={20}>20 ft</MenuItem>
                </Select>
            </FormControl>

            <br />
            <br />
            <br />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={loadedWithPallete}
                        onChange={handleLoadedWithPalleteChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label="Loaded wtih pallete"
            />


            <br /><br />
            {
                showSelectedDateTime && (<h1>You are scheduling for <span className="font-bold">{showSelectedDateTime.toString()}</span></h1>)
            }
            <br />
            <br />
            <Timeline docksReservationDataOfCurrentDate={docksReservationDataOfCurrentDate} />

            {/* <p>{new Date(da).toISOString()}</p> */}
        </>
    );
};

export default TestTheGridFromDB;