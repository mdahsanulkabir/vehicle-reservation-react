import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <ul>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/create-user">Create User</Link></li>
                <li><Link to="/booking">Booking</Link></li>
                <li><Link to="/timeline">Time line</Link></li>
                <li><Link to="/test">Test grid</Link></li>
                <li><Link to="/testfromdb">Test grid from DB</Link></li>
                <li><Link to="/testfromdb2">Test grid from DB 2</Link></li>
            </ul>
        </div>
    );
};

export default Home;