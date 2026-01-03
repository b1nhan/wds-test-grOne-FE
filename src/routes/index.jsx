import { BrowserRouter, Routes, Route,useLocation  } from 'react-router-dom';
import Home from '../pages/Home/Home';
// import Login from '../pages/Login/Login';
import {Nav,Footer } from '../components'

export default function AppRoutes() {
  let location = useLocation();
  let hiden1 = location.pathname === "/login";
  let hiden2 = location.pathname === "/register";
  return (
      <>
    {!hiden1 && !hiden2 && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      {!hiden1 && !hiden2 && <Footer />}
      </>
  );
}
