import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <ul>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/create-user">Create New User</Link></li>
                <li><Link to="/booking">Create a reservation</Link></li>
                <li><Link to="/create-material">Create Material and Assign to Station</Link></li>
                <li><Link to="/create-loading-time">Create loading time based on material, container size and pallete status</Link></li>
            </ul>
        </div>
    );
};

export default Home;