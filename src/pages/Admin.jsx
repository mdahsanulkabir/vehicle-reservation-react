
import { useNavigate } from "react-router-dom";
import Users from "../components/Users";
import { Button } from "@mui/material";


const Admin = () => {
    const navigate = useNavigate()
    return (
        <section>
            <h1>{`Admin's Page`}</h1>
            <br />
            <Users />
            <br />
            <div className="text-center">
                <Button
                    variant="contained"
                    onClick={() => navigate('/')}>
                    Go Home
                </Button>
            </div>
        </section>
    );
};

export default Admin;