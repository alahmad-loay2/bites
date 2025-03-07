import React from "react";
import { Outlet } from "react-router-dom";

import Nav from "../components/Nav";

const MainLayout = () => {
    return (
        <>
            <div className="layout-container">
                <Nav />
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
