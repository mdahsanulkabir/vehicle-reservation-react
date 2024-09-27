/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import { colorTokens } from "../utils/theme/colorTokens";


const Login = () => {
    const { setAuth } = useAuth();
    // const theme = useTheme();
    // const colors = colorTokens(theme.palette.mode);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/'


    const { control, handleSubmit } = useForm({
        defaultValues: {
            userId: "",
            password: ""
        }
    });
    const onSubmit = async (data) => {
        console.log({data})
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/login`,
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            const authData = await response.data;
            console.log(authData)
            setAuth(authData);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err.response) {
                console.log("no server response")
            } else if (err.response?.status === 400) {
                console.log("Missing Username or Password")
            } else if (err.response?.status === 401) {
                console.log("Unauthorized", err)
            } else {
                console.log("Login failed")
            }
        }
    }

    return (
        <div className="login">
            <div className="login-content">
                <h1>Welcome to Beko Vehicle Reservation Application.</h1>
                <br />
                <h4 className="font-bold">Please Login</h4>
                <div className="login-form-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="userId"
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    sx={{
                                        marginBlock: 2,
                                    }}
                                    autoComplete="new-password"
                                    variant="filled"
                                    type="text"
                                    label="User Id"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="password"
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    sx={{
                                        marginBlock: 2,
                                    }}
                                    autoComplete="new-password"
                                    variant="filled"
                                    type="password"
                                    label="Password"
                                    {...field}
                                />
                            )}
                        />
                        <Button
                            sx={{ width: '150px', fontWeight: 'bold', marginInline: 'auto' }}
                            type="submit"
                            variant="contained"
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;