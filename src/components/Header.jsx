import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";

const Header = () => {
  const items = [
    { label: "Home", icon: "pi pi-home", url: "/" },
    { label: "Build PC", icon: "pi pi-desktop", url: "/build-pc" },
    { label: "About", icon: "pi pi-info-circle", url: "/about" },
    { label: "Contact", icon: "pi pi-envelope", url: "/contact" },
  ];

  const start = (
    <Link to="/" className="flex items-center gap-3">
      <span className="text-xl font-bold text-blue-600">TechCore</span>
    </Link>
  );

  const end = (
    <div className="flex items-center gap-4">
     <Link to="/cart">
        <Button
          icon="pi pi-shopping-cart"
          className="p-button-rounded p-button-outlined"
        />
      </Link>

      <Link to="/login">
        <Button
          label="Login"
          icon="pi pi-user"
          className="p-button-text text-blue-600"
        />
      </Link>
      
    </div>
  );

  return (
   <div className="px-10 shadow-sm sticky top-0 z-50 bg-white">
    
    {/* Center wrapper */}
        
        <Menubar
            model={items}
            start={start}
            end={end}
            className="border-none bg-transparent"
        />
        
    
    </div>

  );
};

export default Header;
