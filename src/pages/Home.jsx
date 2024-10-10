import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <ul>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/create-user">Create User</Link></li>

                <li><Link to="/booking">Booking</Link></li>
            </ul>
        </div>
    );
};

export default Home;