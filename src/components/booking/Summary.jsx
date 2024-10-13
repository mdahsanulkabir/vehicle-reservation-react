/* eslint-disable react/prop-types */
import { Button, Paper, Typography } from "@mui/material";
import useAxiosIntercept from "../../hooks/useAxiosIntercept";
import { useGetStationsOfMaterials } from "../../hooks/useGetStationsOfMaterials";


const Summary = ({ setBookingConfirmed, setSummary, setShowBookingForm, allReservationsOfTheSelectedDate, setAllReservationsOfTheSelectedDate, newReserv, bookingDate, bookingTime, material, containerSize, loadedWithPallete, showNoAvailableDock, driverName, driverContactNumber, vehicleRegistrationNumber,duration }) => {
    const axiosPrivate = useAxiosIntercept();

    const stationsOfMaterials = useGetStationsOfMaterials();
    const materialName = stationsOfMaterials.find(mat => mat._id === material)?.materialType
    const handleBack = () => {
        setSummary(false)
        setShowBookingForm(true)
    }

    const handleSaveBooking = async () => {
        try {
            const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_SERVER}/booking`,
                JSON.stringify(newReserv),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            console.log("server data of new reservation", response.data)
            const previousbookingData = [...allReservationsOfTheSelectedDate];
            setAllReservationsOfTheSelectedDate([...previousbookingData, { ...response.data }]);
            setBookingConfirmed(true)
            setSummary(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Paper elevation={8} className="w-3/4 mx-auto p-4 my-8">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} className="text-center pb-4">Check your booking information and Confirm</Typography>
            <div className="text-center">
                <h1>Booking Date & Time : <span className="font-bold">{new Date(bookingDate + "T" + bookingTime).toString()}</span></h1>
            </div>
            {/* <p className="font-bold">For the below object</p> */}
            <div className="flex justify-evenly mt-2">
                <div className="flex-1 text-center">
                    <p>Material : <span>{materialName}</span></p>
                    <p>Container Size : <span>{`${containerSize} ft`}</span></p>
                    <p>Loaded with pallete : <span>{loadedWithPallete ? 'Yes' : 'No'}</span></p>
                    <p>Expected time to unload : <span>{duration ? duration : 'Undefined'}</span></p>
                </div>

                {
                    !showNoAvailableDock &&
                    <div className="flex-1 text-center">
                        <p>Driver Name : <span>{driverName ? driverName : 'NA'}</span></p>
                        <p>Driver Contact Number : <span>{driverContactNumber ? driverContactNumber : 'NA'}</span></p>
                        <p>Vehicle Registration Number : <span>{vehicleRegistrationNumber ? vehicleRegistrationNumber : 'NA'}</span></p>
                    </div>
                }
            </div>
            <div className="text-center">
                {
                    showNoAvailableDock ? (
                        <div className="text-red-600 border border-blue-600 rounded-2xl my-4 p-4">
                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>No available dock is found at your requested time.</Typography>
                            <Typography variant='h6'>Please try with another time.</Typography>
                        </div>
                    ) : <div className="flex w-1/2 justify-center gap-2 my-4 mx-auto">
                        <Button variant="contained" color="primary" onClick={() => handleBack()}>Back</Button>
                        <Button variant="contained" color="secondary" onClick={() => handleSaveBooking()}>Save Booking</Button>
                    </div>
                }
            </div>
        </Paper>
    );
};

export default Summary;