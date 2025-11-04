import React from "react";
import Header from "../components/header";
import Footer from "../components/Footer";


const Layout = ({children}) =>{
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow w-full mx-auto ">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;