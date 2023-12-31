import { Circle, MoreHoriz, SearchOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import DeleteTeammateModal from "../molecules/DeleteTeammateModal";
import MessageContacts from "../molecules/MessageContacts";
import MessageModal from "../molecules/MessageModal";
import { io } from "socket.io-client";
import moment from 'moment'

const DirectMessages = ({community, setCommunity}) => {
  const [open, setOpen] = React.useState(false);
  const [contactGroups, setContactGroups] = useState(null);
  const [direct_messages, setDirectMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [contactGroup, setContactGroup] = useState([])
  const[selectedContactGroup, setSelectedContactGroup] = useState(null)
const scroller = () => {
  document.getElementById('msgbar').scrollTo({ top:document.getElementById('msgbar').scrollHeight, behavior:'smooth'})
}

const urlParams = new URLSearchParams(window.location.search);
const collaboration_id = urlParams.get('collaboration_id')


  const getContactGroups = async() =>{
    let url = process.env.REACT_APP_BACKEND_URL;

    axios
      .get(url + "/contact/has-dm/"+JSON.parse(localStorage.getItem("community"))?._id)
      .then((res) => {
       console.log(res.data)
       let cs = res.data
       axios
       .get(url + "/contact/get-by-user/"+JSON.parse(localStorage.getItem("user"))?._id)
       .then((res) => {
        console.log(res.data)
        let c = [...cs, ...res.data]
        console.log(c)
        setContactGroups(c)
        if(collaboration_id){
             c.forEach(element => {
              if(element.collaboration_id === collaboration_id){
                setSelectedContactGroup(element)
                return
              }
             });
        }else{
          setSelectedContactGroup(c[0])
        }
        
       })
 
       .catch((err) => {
         console.log(err);
       });
       
      })

      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(()=> {
    scroller()
  },[direct_messages])

  useEffect(()=> {
     setDirectMessages([])
  }, [selectedContactGroup])

  const getDirectMessage = async () => {
    let url = process.env.REACT_APP_BACKEND_URL;
    let community_id = JSON.parse(localStorage.getItem('community'))._id
    axios
      .get(url + "/contact/get-contact-group/" + selectedContactGroup?._id+'/'+community_id)
      .then((res) => {
        //console.log(res.data);
        setDirectMessages(res.data.direct_messages);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  const [socket, setSocket] = useState(null)
  const addDirectMessage = async () => {
    
    let url = process.env.REACT_APP_BACKEND_URL;
    let date = Date.now()
    socket.emit("new_message", {
      contact_group_id : selectedContactGroup?._id,
        user_id: JSON.parse(localStorage.getItem("user"))?._id,
        username: JSON.parse(localStorage.getItem("user"))?.first_name + JSON.parse(localStorage.getItem("user"))?.last_name ,
        message,
        time: date,
    });

    axios
      .post(url + "/contact/add-new-message/", {
        contact_group_id : selectedContactGroup?._id,
        user_id: JSON.parse(localStorage.getItem("user"))?._id,
        username: JSON.parse(localStorage.getItem("user"))?.first_name + JSON.parse(localStorage.getItem("user"))?.last_name,
        message,
        time: date,
      })
      .then((res) => {
        //console.log(res.data);
        setDirectMessages(res.data.direct_messages);
        setMessage("")
      })

      .catch((err) => {
        console.log(err);
      });
  };

 
useEffect(()=> {
  if(contactGroups && selectedContactGroup){
    getDirectMessage();
    setSocket(io.connect('https://guzo-backend.herokuapp.com/'))
  }
}, [contactGroups, selectedContactGroup])

 
  useEffect(() => {
    getContactGroups()
  }, [])
 
  useEffect(() => {
    console.log(direct_messages)
    if (socket) {
      socket.on('new_user',(data)=>{
        console.log(data)
      })
      socket.on('new_message', (data)=>{
        console.log(data)

        if(data.contact_group_id === selectedContactGroup._id){
          setDirectMessages((e)=> ([...direct_messages, data]))
        }
      })
    }
  }, [socket,direct_messages,selectedContactGroup]);

  return (
    <div className="bg-white py-[20px] pb-[80px]  md:rounded-[18px] shadow-lg">
      <div className="md:flex space-y-2 md:space-y-0 items-center px-[30px]">
        <div className="md:flex flex-1 text-[#114369] font-bold text-xl ">
          Direct Messages
        </div>
      </div>

      <Divider sx={{ my: 3 }} />
      <MessageModal
        open={open}
        setOpen={setOpen}
        contactGroups={contactGroups}
        selectedContactGroup={selectedContactGroup} setSelectedContactGroup={setSelectedContactGroup}
      />
      <div className="grid grid-cols-5 gap-4 md:px-[30px]">
        <div className=" hidden lg:block col-span-2 shadow-lg py-2 px-3 space-y-4 rounded-xl ">
          <MessageContacts  contactGroups={contactGroups} selectedContactGroup={selectedContactGroup} setSelectedContactGroup={setSelectedContactGroup} />
        </div>

        <div className="col-span-5 lg:col-span-3 shadow-lg py-2 pb-6 px-3 space-y-4 rounded-xl ">
         

          {/* messages */}

          <div className="space-y-4">
            {/* message */}

            <div className='text-sm font-bold text-center hidden lg:block'>{selectedContactGroup?.name} </div>

            <div className="h-[350px] overflow-y-auto" id='msgbar' >
            {direct_messages &&
              direct_messages.map((item, index) => (
                <div className="space-y-4 mb-2" key={index}>
                  <div className="flex items-center">
                    <Avatar
                      variant="square"
                      sx={{
                        bgcolor: "blue",
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                      }}
                      
                    >
                     {item.username.substr(0,1)}
                    </Avatar>

                    <div className="font-semibold text-[14px] ml-3 flex-1">
                    {item.username.substr(0,1)}
                    </div>

                    <div className="text-[12px] text-[#114369] ">{moment(Number(item.time)).fromNow()}</div>
                  </div>
                  <div className="w-full bg-[#EBF1F5] px-4 py-2 text-[12px] rounded-lg ">
                   {item.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full">
              <InputBase
                multiline
                rows={5}
                sx={{
                  bgcolor: "#FAFAFA",
                  border: "1px solid #E6E6E6",
                  pl: 3,
                  fontSize: "14px",
                  borderRadius: "8px",
                  width: { md: "100%", xs: "100%" },
                  py: "2px",
                }}
                placeholder="your message here"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}

                onKeyPress={(e)=> {
                  if (e.key === "Enter") {
                    // Cancel the default action, if needed
                    e.preventDefault();
                    // Trigger the button element with a click
                    addDirectMessage()
                  }
                }}
              />

              <div className="flex items-center ">
                <div className="flex-1" />
                <Button
                  onClick={addDirectMessage}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#24A0FD",
                    color: "white",
                    border: "1px solid #24A0FD",
                    ":hover": {
                      bgcolor: "#24A0FD",
                      color: "white",
                    },
                    mt: 1,
                  }}
                >
                  send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
