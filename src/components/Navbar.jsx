// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, IconButton, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { authInitialValue } from "../context/AuthProvider";

import logo from "../../src/assets/logo.svg"


const NavBar = () => {
    const { setAuth, setPersist } = useAuth();
    const navigate = useNavigate();
    const logOut = () => {
        setAuth(authInitialValue);
        setPersist(false); // Clear the persistence setting
        // localStorage.removeItem('persist');
        // localStorage.removeItem('auth'); // Clear any other persisted data if needed
        navigate('/'); // Navigate to the home page or login page
        window.location.reload(); // Force a reload to ensure state is reset
    }
    return (
        <nav>
            <Box
                component="img"
                src={logo}
                alt="beko logo"
                sx={{ width: 60, p: 0, m: 0 }}
                onClick={() => navigate('/')}

            />
            <Typography variant='h6' className="">Vehicle Booking App</Typography>
            <div className="flex">
                <div className="search-bar border-blue-500 border-[1px] rounded-full">
                    <input className="search-text bg-blue-100 " type="text" name="" id="" />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                </div>
                <div className="icon-group">
                    <IconButton>
                        <DarkModeOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <NotificationsOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={logOut}>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;