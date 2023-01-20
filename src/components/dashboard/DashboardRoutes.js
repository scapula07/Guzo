import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardHeader from "../layout/DashboardHeader";
import DashboardSidebar from "../layout/DashboardSidebar";
import EditCommunityProfile from "./EditCommunityProfile";
import Landing from "./Landing";

const DashboardRoutes = () => {
  return (
    <>
      <DashboardHeader />
      <div className="lg:grid md:grid md:grid-cols-3 lg:grid-cols-4 lg:gap-[60px] md:gap-3 md:px-5 lg:px-[98px] md:py-4 lg:py-[33px]">
        <div className="hidden lg:block md:block">
        <DashboardSidebar />    
        </div>

        <div className="lg:col-span-3 md:col-span-2 ">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/edit-community-profile' element={<EditCommunityProfile/>} />
          </Routes> 
        </div>
      </div>
    </>
  );
};

export default DashboardRoutes;
