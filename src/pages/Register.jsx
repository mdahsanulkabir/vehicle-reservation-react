import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useAxiosIntercept from "../hooks/useAxiosIntercept";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const axiosPrivate = useAxiosIntercept();
    const [name, setName] = useState("")
    const [userId, setUserId] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [roleId, setRoleId] = useState('')
    const [newUser, setNewUser] = useState({})
    const navigate = useNavigate();

    const handleCreateUser = async () => {
        const user = {
            name,
            userId,
            email: userEmail,
            roleId
        }
        try {
            const response = await axiosPrivate.post(`${import.meta.env.VITE_BACKEND_SERVER}/user`,
                JSON.stringify(user),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            const savedUser = await response.data
            console.log("saved user: ", savedUser)
            setNewUser(savedUser)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {
                newUser?._id ? (
                    <>
                        <Typography variant="h6" color="primary" className="text-center my-4">New User Created with following credentials</Typography>
                        <div className="w-1/2 my-8 mx-auto border-2 p-4 rounded-md flex flex-col gap-4">
                            <p>{`User Name :  ${newUser.name}`}</p>
                            <p>{`User ID :    ${newUser.userId}`}</p>
                            <p>{`User Email : ${newUser.email}`}</p>
                            <p>{`User Role :  ${newUser.roleId.role}`}</p>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="contained"
                                onClick={() => navigate('/')}>
                                Go Home
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" color="primary" className="text-center my-4">Register User</Typography>
                        <form className="w-1/2 my-8 mx-auto border-2 p-4 rounded-md flex flex-col gap-4">
                            <Typography variant="h6" className="text-center pb-4">Provide User Credentials</Typography>
                            <TextField
                                label="User Name"
                                size="small"
                                variant="outlined"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <TextField
                                label="User ID"
                                size="small"
                                variant="outlined"
                                type="text"
                                value={userId}
                                onChange={e => setUserId(e.target.value)}
                            />
                            <TextField
                                label="User Email"
                                size="small"
                                variant="outlined"
                                type="text"
                                value={userEmail}
                                onChange={e => setUserEmail(e.target.value)}
                            />

                            {/* inputs to select rolse */}
                            <FormControl >
                                <InputLabel id="select-material-label">Select User Role</InputLabel>
                                <Select
                                    labelId="select-material-label"
                                    id="select-material"
                                    value={roleId}
                                    label="Material"
                                    onChange={e => setRoleId(e.target.value)}
                                >
                                    <MenuItem value={"66f4ef9a9cb10111ad517507"}>Admin</MenuItem>
                                    <MenuItem value={"66f6bbec7f38d8f4d48a6573"}>Import Booker</MenuItem>
                                    <MenuItem value={"66f6c1bb7f38d8f4d48a6588"}>Local Booker</MenuItem>
                                    <MenuItem value={"66f6bfcd7f38d8f4d48a657e"}>Factory person</MenuItem>
                                    <MenuItem value={"66f6c1c67f38d8f4d48a658a"}>FG Booker</MenuItem>
                                </Select>
                            </FormControl>

                            <div className="text-center">
                                <Button
                                    variant="contained"
                                    disabled={!(name && userId && userEmail && roleId)}
                                    onClick={() => handleCreateUser()}>
                                    Create User
                                </Button>
                            </div>
                        </form>
                    </>
                )
            }
        </div>
    );
};

export default Register;