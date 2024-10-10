/* eslint-disable react/prop-types */
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Button, Typography, Backdrop, Paper } from "@mui/material";
import useAxiosIntercept from "../../hooks/useAxiosIntercept";
import { getSingleLoadUnloadTime } from "./getSingleLoadUnloadTime";
import { getDockId } from "./getDockId";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";


const ReservationForm = ({ bookingDate, bookingTime, setShowBookingForm, setShowNoAvailableDock, setSummary, material, setMaterial, containerSize, setContainerSize, loadedWithPallete, setLoadedWithPallete, allReservationsOfTheSelectedDate, allDocks, setNewReserv }) => {
    const axiosPrivate = useAxiosIntercept();
    const { auth } = useAuth();
    const [showTimeSelectionError, setShowTimeSelectionError] = useState(false);

    const handleMaterialChange = (e) => {
        setMaterial(e.target.value);
    };

    const handleContainerSizeChange = (e) => {
        setContainerSize(e.target.value);
    };

    const handleLoadedWithPalleteChange = (e) => {
        setLoadedWithPallete(e.target.checked);
    };

    const findAvailableDockOnSelectedTimeAndStation = async () => {
        const localDateTime = bookingDate + "T" + bookingTime
        console.log("local date time : (in find available booking slot) :", localDateTime)
        const bookingDateTime = new Date(localDateTime)
        const singleLoadUnloadTime = await getSingleLoadUnloadTime(material, containerSize, loadedWithPallete, axiosPrivate)
        console.log("single load unload time", singleLoadUnloadTime)
        const localDate = new Date(bookingDate);
        const referenceBookingDate = new Date(localDate)
        referenceBookingDate.setUTCHours(0, 0, 0, 0)
        referenceBookingDate.setHours(referenceBookingDate.getHours() - 6);


        const availableDockId = getDockId(bookingDateTime, singleLoadUnloadTime.requiredTime, singleLoadUnloadTime.stationForMaterial.stationType, allReservationsOfTheSelectedDate, allDocks)
        if (availableDockId) {
            console.log("Your booking dock is : ", availableDockId)
            setNewReserv({
                user: auth?.user_id,
                bookingDate: referenceBookingDate,
                startTime: bookingDateTime,
                endTime: new Date(bookingDateTime.getTime() + singleLoadUnloadTime.requiredTime * 60 * 1000),
                loadUnloadTime: singleLoadUnloadTime._id,
                status: "pending",
                dockId: availableDockId
            })
        } else {
            setShowNoAvailableDock(true);
        }
    }

    const handleProceedToNextForBooking = () => {
        const localDateTime = bookingDate + "T" + bookingTime
        const reservationSchedule = new Date(localDateTime)
        if (reservationSchedule.getHours() < 7 || reservationSchedule.getHours() > 14) {
            console.log("You are trying to schedule beyond allowed time. \n Please schedule between 7:00 am to 2:59 pm")
            setShowTimeSelectionError(true)
        } else {
            setSummary(true)
            setShowBookingForm(false)
            findAvailableDockOnSelectedTimeAndStation()
        }
    }
    return (
        <>
            {
                // showTimeSelectionError && (
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={showTimeSelectionError}
                    onClick={() => setShowTimeSelectionError(false)}
                >
                    <Paper className="w-[600px] h-[200px] text-center flex place-items-center justify-center">
                        <div>
                            <h1 className="m-2">Your schedule time is not ok</h1>
                            <h1 className="m-2">Change your time.</h1>
                            <Button variant="contained" onClick={() => setShowTimeSelectionError(false)}>OK</Button>
                        </div>
                    </Paper>
                </Backdrop>

                // )
            }

            <form className="w-1/2 my-8 mx-auto border-2 p-4 rounded-md">
                <Typography variant="h6" className="text-center pb-4">Provide your reservation information...</Typography>
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
                        <MenuItem value={"66fd2744cfb1ce3bb6143926"}>Body Stand</MenuItem>
                    </Select>
                </FormControl>
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
                        <MenuItem value={12}>12 ft</MenuItem>
                        <MenuItem value={8}>8 ft</MenuItem>
                    </Select>
                </FormControl>
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
                <br />
                <Button variant="contained" disabled={ !(material && containerSize) } onClick={() => handleProceedToNextForBooking()}>Proceed for booking</Button>
                <br />
            </form>
        </>
    );
};

export default ReservationForm;