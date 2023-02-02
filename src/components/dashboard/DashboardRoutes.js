import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardHeader from "../layout/DashboardHeader";
import DashboardSidebar from "../layout/DashboardSidebar";
import AddTeammates from "./AddTeammates";
import CollaborationOwnerView from "./CollaborationOwnerView";
import CreateCollaboration from "./CreateCollaboration";
import DirectMessages from "./DirectMessages";
import Discover from "./Discover";
import EditCommunityProfile from "./EditCommunityProfile";
import EditTeammates from "./EditTeammates";
import Landing from "./Landing";
import MyCollaborations from "./MyCollaborations";
import Teammates from "./Teammates";

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
            <Route path='/my-collaborations' element={<MyCollaborations/>} />
            <Route path='/create-collaboration' element={<CreateCollaboration/>} />
            <Route path='/collaboration' element={<CollaborationOwnerView />} />
            <Route path='/discover' element={<Discover />} />
            <Route path='/teammates' element={<Teammates />} />
            <Route path='/teammates/add' element={<AddTeammates />} />
            <Route path='/teammates/edit' element={<EditTeammates />} />
            <Route path='/direct-messages' element={<DirectMessages />} />
          </Routes> 
        </div>
      </div>
    </>
  );
};

export default DashboardRoutes;
