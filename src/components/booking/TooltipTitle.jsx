/* eslint-disable react/prop-types */

import Grid from '@mui/material/Grid2';

const TooltipTitle = ({ reservation }) => {
    // console.log(reservation)
    return (
        <div>
            <Grid container rowSpacing={1} columnSpacing={1} sx={{fontSize: '16px'}}>
                <Grid size={6}>
                    <p>Reservation ID</p>
                </Grid>
                <Grid size={6}>
                    <p>{reservation?._id}</p>
                </Grid>
                <Grid size={6}>
                    <p>Created By</p>
                </Grid>
                <Grid size={6}>
                    <p>{reservation?.user.name}</p>
                </Grid>
                <Grid size={6}>
                    <p>Material</p>
                </Grid>
                <Grid size={6}>
                    <p>{reservation?.loadUnloadTime.stationForMaterial.materialType}</p>
                </Grid>
                <Grid size={6}>
                    <p>With Pallete</p>
                </Grid>
                <Grid size={6}>
                    <p>{reservation?.loadUnloadTime.loadedWithPallete ? 'Yes': 'No'}</p>
                </Grid>
                <Grid size={6}>
                    <p>Container Size</p>
                </Grid>
                <Grid size={6}>
                    <p>{`${reservation?.loadUnloadTime.containerSize} ft`}</p>
                </Grid>
                <Grid size={6}>
                    <p>Driver Name</p>
                </Grid>
                <Grid size={6}>
                    <p>{reservation?.driverName ? reservation.driverName: 'N/A'}</p>
                </Grid>
                <Grid size={6}>
                    <p>Driver Contact #</p>
                </Grid>
                <Grid size={6}>
                    <p>{reservation?.driverContactNumber ? reservation.driverContactNumber : 'N/A'}</p>
                </Grid>
                <Grid size={6}>
                    <p>Vehicle Reg. Number</p>
                </Grid>
                <Grid size={6}>
                    <p>{reservation?.vehicleRegistrationNumber ? reservation.vehicleRegistrationNumber : 'N/A'}</p>
                </Grid>
            </Grid>

        </div>
    );
};

export default TooltipTitle;