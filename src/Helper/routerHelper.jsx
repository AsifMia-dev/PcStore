import Registration from "../pages/auth/Registration";
import Login from "../pages/auth/Login";
import Header from "../components/header";
import Home from "../pages/Home";
import HeroSection from "../components/HomeComponents/HeroSection";
import PrivateRoute from "../components/PrivateRoute";
import CartPage from "../pages/user/CartPage";
import Profile from "../pages/user/Profile";

export const allRouters = [
    //Public Routes
    {
        path : "/login",
        element : Login,
        isPrivate : false
    },
    {
        path : "/reg",
        element : Registration,
        isPrivate : false
        
    },
    {
        path : "/",
        element : Home,
        isPrivate : false
    },

    //User Private Routes
    {
        path : "/user/home",
        element : Home,
        iPrivate : true,
        role : "user"
    },
    {
        path : "/cart",
        element : CartPage,
        isPrivate : true,
        role : "user"
    },
    {
        path: "/profile",
        element : Profile,
        isPrivate : true,
        role : "user"
    }

    
];

export const renderRouterElement = (route) =>{
    if(route.isPrivate){
        return (
            <PrivateRoute role={route.role}>
                <route.element />
            </PrivateRoute>
        )
    }
            
    return <route.element />
}

