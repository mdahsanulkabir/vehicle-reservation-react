/* eslint-disable react/prop-types */
import { Button, Paper, Typography } from "@mui/material";


const BookingConfirmation = ({ setBookingConfirmed, setGoForBooking, setSummary }) => {

    const handledBookingConfirmed = () => {
        console.log("booking is confirmed")
        setGoForBooking(false)
        setSummary(false)
        setBookingConfirmed(false)
    }
    return (
        <Paper elevation={8} className="w-3/4 mx-auto p-4 my-16">
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} className="text-center p-4">Your booking is confirmed.</Typography>
            <div className="flex w-1/2 justify-center my-4 mx-auto">
                <Button variant="contained" color="primary" onClick={() => handledBookingConfirmed()}>OK</Button>
            </div>
        </Paper>
    );
};

export default BookingConfirmation;