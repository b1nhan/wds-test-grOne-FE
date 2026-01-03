import {Bell, CircleUser,ShoppingCart } from "lucide-react";

let Navbar = () => { 
    return <header> 
        <div className="container-fluid w-full bg-white p-4 shadow flex justify-between items-center px-10 fixed z-10 ">
            <div className="Left font-bold text-3xl">LOGO</div>
            <div className="Right flex gap-6">
                <ShoppingCart />
                <div className="flex gap-2 items-center">
                    <b >Username</b>
                    <CircleUser className="size-8"/>
                </div>
            </div>
         </div>
    </header>
        
}
export default Navbar;