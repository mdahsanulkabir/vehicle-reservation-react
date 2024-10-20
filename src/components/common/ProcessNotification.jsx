/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";


const ProcessNotification = ({ notificationText }) => {
    return (
        <div className="w-[400px] h-[200px] absolute top-[500px] left-[500px]">
            <Typography variant="h6">{notificationText}</Typography>
        </div>
    );
};

export default ProcessNotification;