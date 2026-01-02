import { BrowserRouter, Routes, Route,useLocation  } from 'react-router-dom';
import Home from '../pages/Home/Home';
// import Login from '../pages/Login/Login';
import {Nav } from '../comportnents'

export default function AppRoutes() {
  let location = useLocation();
  let hidenNavbar1 = location.pathname === "/login";
  let hidenNavbar2 = location.pathname === "/register";
  return (
      <>
    {!hidenNavbar1 && !hidenNavbar2 && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      </>
  );
}
