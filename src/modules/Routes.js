import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./authentication/Index";
import Invite from "./authentication/Invite";
import Share from "./authentication/Share";
import Profile from "./OrgProfile";
import Home from "./Home/views";
import Feeds from "./Home/views/feed";
import Ecosystems from "./Home/views/ecosystem";
import Connections from "./Connections";
import Active from "./Connections/views/active";
import Pending from "./Connections/views/pending";
import Collaborations from "./Collaboration";
import Myopportunities from "./Collaboration/views/myopportunities";
import JoinedOpportunities from "./Collaboration/views/joinedOpportunities";
import Contacts from "./Collaboration/views/contacts";
import Messenger from "./Messenger";
import GroupChat from "./Messenger/views/groupchat";
import DM from "./Messenger/views/dm";
import { Onboarding,
       Accounts,
       Register,EmailAuth,
       AuthTypes,FactorAuth,
       CreateProfiles,
       Individual,
       Eco
      } from "./Onboarding";
import Org from "./Onboarding/views/Profiles/org";
import Notifications from "./Notifications";
import {Settings ,EditProfile} from "./Settings";




const NewRoutes = () => {


  

  

  return (
    <>
            <Routes>
                <Route path="/auth/*" element={<Index/>} />
                <Route path="onboard" element={<Onboarding/>} >
                    <Route path="" element={<Accounts/>} />
                    <Route path="register" element={<Register/>} >
                        <Route path="" element={<AuthTypes/>} />
                        <Route path="email-password" element={<EmailAuth/>} />
                    </Route>
                    <Route path="2fa" element={<FactorAuth/>} />
                    <Route path="profile" element={<CreateProfiles/>} >
                        <Route path="" element={<Individual/>} />
                        <Route path="org" element={<Org/>} />
                        <Route path="network" element={<Eco/>} />
                    </Route>
                </Route>
                <Route path="/share" element={<Share/>} />
                <Route path="/invite" element={<Invite/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/" element={<Home/>} >
                    <Route path="" element={<Feeds/>} />
                    <Route path="ecosystems" element={<Ecosystems/>} />
                </Route>
                <Route path="/connections" element={<Connections/>} >
                     <Route path="" element={<Active/>} />
                     <Route path="pending" element={<Pending/>} />
                </Route>
                <Route path="/collaborations" element={<Collaborations/>} >
                     <Route path="" element={<Myopportunities/>} />
                     <Route path="joined" element={<JoinedOpportunities/>} />
                     <Route path="contacts" element={<Contacts/>} />
                </Route>
                <Route path="/messages" element={<Messenger/>} >
                     <Route path="" element={<DM/>} />
                     <Route path="group" element={<GroupChat/>} />
                
                </Route>
                <Route path="/notifications" element={<Notifications/>} />
                <Route path="/settings" element={<Settings/>} />
                <Route path="/setting-edit-profile" element={<EditProfile/>} />
    
            </Routes>
    </>
  );
};

export default NewRoutes;