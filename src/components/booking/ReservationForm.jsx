/* eslint-disable react/prop-types */
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Button, Typography, Backdrop, Paper, TextField } from "@mui/material";
import useAxiosIntercept from "../../hooks/useAxiosIntercept";
import { getSingleLoadUnloadTime } from "./getSingleLoadUnloadTime";
import { getDockId } from "./getDockId";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useGetStationsOfMaterials } from "../../hooks/useGetStationsOfMaterials";
import Grid from '@mui/material/Grid2';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const ReservationForm = ({vehicleRegistrationNumber, setVehicleRegistrationNumber,driverContactNumber, setDriverContactNumber, driverName, setDriverName, bookingDate, bookingTime, setShowBookingForm, setShowNoAvailableDock, setSummary, material, setMaterial, containerSize, setContainerSize, loadedWithPallete, setLoadedWithPallete, allReservationsOfTheSelectedDate, allDocks, setNewReserv }) => {
    const axiosPrivate = useAxiosIntercept();
    const { auth } = useAuth();
    const [showTimeSelectionError, setShowTimeSelectionError] = useState(false);
    const stationsOfMaterials = useGetStationsOfMaterials();

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



        // Comment on below availableDockId and the if...else condition
        // Purpose: check availability of any dock at the provided date-time and create new reservation object
        // Step 1: availableDockId -> collectes if there is any dock available 
        // Step 1: at the given time (duration also needed to check if there is any overlapping booking after this time), and given station type
        // Step 2: if...else -> if availableDockId is found, i.e., a reservation can be made at the availableDockId. 
        // Step 2: So we create an object of the reservation information and update the state
        // Step 2: if there is no available dock, then it will set the showNoAvailableDock (which in turn will be used by the Booking Component to show the non-availability message)

        // i got an error in below line
        //  Uncaught (in promise) TypeError: Cannot read properties of null (reading 'requiredTime')
        //  at k (index-D3foXYOh.js:202:23488)
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
                dockId: availableDockId,
                driverName,
                driverContactNumber,
                vehicleRegistrationNumber
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
                        <div className="flex flex-col">
                            <div className="flex">
                                <div className="pt-2">
                                    <ErrorOutlineIcon color='error' sx={{ fontSize: 56 }}/>
                                </div>
                                <div>
                                    <h1 className="m-2">Your reservation time is not ok</h1>
                                    <h1 className="m-2">Change your time.</h1>
                                </div>
                            </div>

                            <div>
                                <Button variant="contained" className="w-1/2" onClick={() => setShowTimeSelectionError(false)}>OK</Button>
                            </div>
                        </div>

                    </Paper>
                </Backdrop>

                // )
            }

            <form className="w-1/2 my-8 mx-auto border-2 p-4 rounded-md">
                <Typography variant="h6" className="text-center pb-4">Provide your reservation information</Typography>
                <FormControl fullWidth>
                    <InputLabel id="select-material-label">Select material type</InputLabel>
                    <Select
                        labelId="select-material-label"
                        id="select-material"
                        value={material}
                        label="Select material type"
                        onChange={e => setMaterial(e.target.value)}
                        size="small"
                    >
                        <MenuItem key={"default_blank_in_reservation_form"} value={''}>{''}</MenuItem>
                        {
                            stationsOfMaterials?.map(item => <MenuItem key={item._id} value={item._id}>{item.materialType}</MenuItem>)
                        }

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
                        label="Select Container Size"
                        onChange={e => setContainerSize(e.target.value)}
                        size="small"
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
                            onChange={ e => setLoadedWithPallete(e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                    label="Loaded wtih pallete"
                />
                <br />
                <Grid container rowSpacing={1} columnSpacing={1}>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="Driver Name"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={driverName}
                            onChange={e => setDriverName(e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="Driver Contact Number"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={driverContactNumber}
                            onChange={e => setDriverContactNumber(e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="Vehicle Registration Number"
                            variant="outlined"
                            type="text"
                            size="small"
                            value={vehicleRegistrationNumber}
                            onChange={e => setVehicleRegistrationNumber(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <br />
                <Button variant="contained" disabled={!(material && containerSize)} onClick={() => handleProceedToNextForBooking()}>Proceed for booking</Button>
                <br />
            </form>
        </>
    );
};

export default ReservationForm;