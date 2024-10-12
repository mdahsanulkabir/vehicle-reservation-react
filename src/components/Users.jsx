import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosIntercept";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid2';
import { Typography } from "@mui/material";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                });
                console.log(response.data);
                setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getUsers();
    }, [axiosPrivate, location, navigate])

    return (
        <article>
            <div className="bg-black">
                <Typography variant="h5" className="text-center my-4 text-white">User List</Typography>
            </div>
            <br />
            {users?.length
                ? (
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid size={3}>
                            <Typography sx={{ fontSize: '20px' }}>User Name</Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography sx={{ fontSize: '20px' }}>User ID</Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography sx={{ fontSize: '20px' }}>User Email</Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography sx={{ fontSize: '20px' }}>User Role</Typography>
                        </Grid>
                        {
                            users?.map(user =>
                                <React.Fragment key={user._id}>
                                    <Grid size={3}>
                                        <p>{user.name}</p>
                                    </Grid>
                                    <Grid size={3}>
                                        <p>{user.userId}</p>
                                    </Grid>
                                    <Grid size={3}>
                                        <p>{user.email}</p>
                                    </Grid>
                                    <Grid size={3}>
                                        <p>{user.roleId.role}</p>
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                    </Grid>
                ) : <Typography variant="h5" className="text-center my-4 text-white">Loading...</Typography>
            }
        </article>
    );
};

export default Users;