import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import PersistLogin from "./components/PersistLogin";
import Layout from "./components/Layout";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import CreateMaterial from "./pages/CreateMaterial";
import LoadingTime from "./pages/LoadingTime";
import PasswordChange from "./pages/PasswordChange";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path='login' element={<Login />} />


        <Route path="unauthorized" element={<Unauthorized />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={
            [
              import.meta.env.VITE_ADMIN_ROLE,
              import.meta.env.VITE_IMPORT_BOOKER_ROLE,
              import.meta.env.VITE_FACTORY_PERSON_ROLE,
            ]
          } />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="booking" element={<Booking />} />
              <Route path="change-password" element={<PasswordChange />} />

              <Route element={<RequireAuth allowedRoles={[import.meta.env.VITE_ADMIN_ROLE]} />}>
                <Route path="admin" element={<Admin />} />
                <Route path="create-user" element={<Register />} />
                <Route path="create-material" element={<CreateMaterial />} />
                <Route path="create-loading-time" element={<LoadingTime />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<div><h1>404 - Page not found</h1></div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
