import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useAxiosIntercept from "../hooks/useAxiosIntercept";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const PasswordChange = () => {
    const axiosPrivate = useAxiosIntercept();
    const { auth } = useAuth();
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [isMatched, setIsMatched] = useState(false)
    const [passwordChangedSuccess, setPasswordChangedSuccess] = useState(false)
    const navigate = useNavigate();

    const changePassword = async () => {
        console.log("Auth:", auth)
        try {
            const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_SERVER}/change-password`,
                JSON.stringify({
                    userId: auth.user_id,
                    oldPassword,
                    newPassword
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            console.log("response from server", response.data)
            setPasswordChangedSuccess(true)
        } catch (error) {
            console.log("changing password error: ", error)
        }
    }

    const handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            setIsMatched(true)
        } else {
            changePassword();
        }
    }
    return (
        <>
            {
                passwordChangedSuccess ? (
                    <div className="w-1/2 my-8 mx-auto border-2 p-4 rounded-md flex flex-col gap-4">
                        <Typography variant="h6" className="text-center pb-4">Password Changed Successfully</Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/login')}>
                            Log in again
                        </Button>
                    </div>
                ) : (
                    <>
                        <Typography variant="h6" color="primary" className="text-center my-4">Change Password</Typography >
                        <form className="w-1/2 my-8 mx-auto border-2 p-4 rounded-md flex flex-col gap-4">
                            <Typography variant="h6" className="text-center pb-4">Provide User Credentials</Typography>
                            <TextField
                                label="Old Password"
                                size="small"
                                variant="outlined"
                                type="password"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                            <TextField
                                label="New Password"
                                size="small"
                                variant="outlined"
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <TextField
                                label="Confirm New Password"
                                size="small"
                                variant="outlined"
                                type="password"
                                value={confirmNewPassword}
                                onChange={e => setConfirmNewPassword(e.target.value)}
                            />
                            {
                                isMatched && <p className="text-red-600">New Password does not match</p>
                            }

                            <div className="text-center">
                                <Button
                                    variant="contained"
                                    disabled={(oldPassword === '') || (newPassword === '') || (confirmNewPassword === '')}
                                    onClick={() => handleChangePassword()}>
                                    Change Password
                                </Button>
                            </div>
                        </form>
                    </>

                )

            }
        </>
    )
}

export default PasswordChange;