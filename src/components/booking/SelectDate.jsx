/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/material";


const SelectDate = ({ goForBooking, setGoForBooking, setShowBookingForm, bookingDate, setBookingDate, bookingTime, setBookingTime, setShowNoAvailableDock, setSummary }) => {
    
    console.log("show date: ", bookingDate, " and Show time: ", bookingTime)

    const handleChangeTime = (e) => {
        setBookingTime(e.target.value)
        setShowNoAvailableDock(false)
        setShowBookingForm(true)
        setSummary(false)
    };

    

    return (
        <>
            <div className="flex justify-between">
                <div className="flex justify-center ">
                    <div> <Typography variant="h6">{bookingDate ? "Your selected date is" : "Select the date you are interested in"} :</Typography></div>
                    <div className="flex gap-4">
                        <input type="date" disabled={goForBooking} className="bg-blue-600 text-sky-200" value={bookingDate} onChange={
                            (e) => setBookingDate(e.target.value)
                        } />
                    </div>
                </div>
                {
                    bookingDate && !goForBooking && <div className="flex justify-center ">
                        <Button variant="contained" onClick={() => {setGoForBooking(true); setBookingTime("")}}>Create a Reservation</Button>
                    </div>
                }
            </div>

            {
                goForBooking && (
                    <>
                        <div className="flex mt-2 align-middle">
                            <div>
                                <Typography variant="h6">Select a time for reservation :</Typography>
                            </div>
                            <input
                                type="time"
                                className="bg-blue-600 text-sky-200"
                                value={bookingTime}
                                onChange={(e) => handleChangeTime(e)}
                            />
                            <span>(7:00 am - 2:59 pm)</span>
                        </div>
                        {/* <Button variant="contained" onClick={handleDateChange}>Select The Date</Button> */}
                    </>
                )
            }

        </>
    );
};

export default SelectDate;