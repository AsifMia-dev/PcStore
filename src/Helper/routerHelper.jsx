import Registration from "../pages/auth/Registration";
import Login from "../pages/auth/Login";
import Header from "../components/header";
import Home from "../pages/Home";
import HeroSection from "../components/HomeComponents/HeroSection";
import path from "path";

export const allRouters = [
    {
        path : "/login",
        element : Login
    },
    {
        path : "/reg",
        element : Registration
    },
    {
        path : "/",
        element : Home
    }
    
];

export const renderRouterElement = (route) =>{
    return <route.element />
}

