import React,{useState} from 'react'
import {AiFillHome} from "react-icons/ai"
import home from "../assets/icons/home.png"
import user from "../assets/icons/user.png"
import icon from "../assets/icon.png"
import connections from "../assets/icons/connections.png"
import message from "../assets/icons/message.png"
import opportunity from "../assets/icons/opportunity.png"
import ecosystem from "../assets/icons/ecosystem.png"
import { Link } from 'react-router-dom'
import { groupState,userState } from '../Recoil/globalstate'
import {useRecoilValue} from "recoil"
import CreatePosts from '../ CreatePost.'
import Modal from '../Modal'
import {AiOutlineClose } from "react-icons/ai"

export default function TabsPanel() {
    const group =useRecoilValue(groupState)
    const [trigger,setTrigger]=useState(false)
    const currentUser=useRecoilValue(userState)
  return (
    <>
    <div className='py-6  w-full relative h-full'>
        <div className='flex flex-col items-center space-y-10 w-full'>
            {group?.type?.length >0?
                 <h5 className='font-semibold text-lg'>{group?.name}</h5>
                 :
                 <h5 className='font-semibold text-lg'>{group?.firstName + " " + group?.lastName}</h5>


            }
          
            <div className='flex flex-col py-20 space-y-6'>
                {navs.map((nav)=>{
                     return(
                        <div className='flex items-center space-x-6'>
                            <img 
                              src={nav?.icon}
                              className="h-5 w-5"
                            />
                            <Link to={nav?.link}>
                            <h5 className='font-semibold'>{nav?.name}</h5>
                            </Link>
                           
                        </div>
                     )
                })

                 }

                 <div className='py-6'>
                    <button className='font-semibold bg-blue-600 py-2 rounded-full text-white text-sm w-full'
                      onClick={()=>setTrigger(true)}
                     >Post</button>
                 </div>


                  </div>
            

                </div>

                <div className='absolute bottom-0 flex w-full justify-center py-6'> 
                   <img 
                     src={icon}
                    />

                 </div>

    </div>


    <Modal trigger={trigger}  cname="w-1/2 py-2   px-4 rounded-lg " >
               <div className='w-full flex justify-end px-6 py-2'>
                    <AiOutlineClose 
                    onClick={()=>setTrigger(false)}
                 />

              </div>
              <div className='h-full overflow-y-scroll' style={{height:"500px"}}>
                <CreatePosts 
                  group={group}
                  currentUser={currentUser}
                />

              </div>
              
        
      </Modal>
         


    </>
  )
}


const navs=[
    {
        name:"Home",
        icon:home,
        link:"/home"

    },
    {
        name:"Connections",
        icon:connections,
        link:"/connections"

    },
    {
        name:"Posts",
        icon:opportunity,
        link:"/collaborations"
    },
    {
        name:"Ecosystem",
        icon:ecosystem,
        link:"/ecosystem"
    },
    {
        name:"Messages",
        icon:message,
        link:"/messages"
    },
    {
        name:"Profile",
        icon:user,
        link:"/profile"
    },
]