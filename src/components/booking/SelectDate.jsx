/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useRef, useState } from "react";


const SelectDate = ({setShowSelectedDateTime, setShowDate, setShowNoAvailableDock}) => {
    const [showError, setShowError] = useState(false);
    const dateRef = useRef('');
    const timeRef = useRef('');

    const handleDateChange = () => {
        setShowNoAvailableDock(false)
        const selectedDate = dateRef.current.value + "T" + timeRef.current.value; // Access the input value through the ref
        const reservationSchedule = new Date(selectedDate)
        console.log("reservation booking date time", reservationSchedule)


        if (reservationSchedule.getHours() < 7 || reservationSchedule.getHours() > 14) {
            console.log("You are trying to schedule beyond allowed time. \n Please schedule between 7:00 am to 2:59 pm")
            setShowError(true)
            return null;
        } else {
            setShowSelectedDateTime(reservationSchedule)
        }

        if (selectedDate) {
            //setShowDate(selectedDate + 'T00:00'); // Set the date with time as midnight in local time
            console.log('Selected Date:', dateRef.current.value);
            setShowDate(dateRef.current.value)

        } else {
            console.log('No date selected');
        }
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
                <input type="time" ref={timeRef} /> (7:00 am - 2:59 pm)
            </div>
            <Button variant="contained" onClick={handleDateChange}>Select The Date</Button>
        </>
    );
};

export default SelectDate;