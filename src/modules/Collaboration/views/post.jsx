import React,{useState} from 'react'
import { useOutletContext } from 'react-router-dom';
import {MdDelete} from "react-icons/md"
import share from "../../assets/icons/share.png"
import {RiArrowDownSLine} from "react-icons/ri"
import {AiOutlineClose} from "react-icons/ai"
import Modal from '../../Modal';
import UpdatePosts from '../../ UpdatePost';
import { groupState,userState } from '../../Recoil/globalstate';
import { useRecoilValue } from 'recoil';
import ClipLoader from "react-spinners/ClipLoader";
import Request from '../components/request';
import Partner from '../components/partners';
import DeletePost from '../../DeletePost';

export default function Post() {
    const [collab]= useOutletContext();
    const [trigger,setTrigger]=useState(false)
    console.log(collab,"coollabes")

    const group =useRecoilValue(groupState)
    const currentUser=useRecoilValue(userState)

    const deleteCollab=()=>{
       try{

         }catch(e){
           console.log(e)
         }
     }

  return (
    <>

  <div className='flex flex-col w-full rounded-lg'>
          <div className='flex w-full items-center justify-end space-x-4'>
              <button
                    style={{background: "rgba(236, 235, 254, 1)"}}
                    className='text-blue-700 rounded-full px-8 py-1.5'
                    onClick={()=>setTrigger(true)}
                >
                Edit Post
             </button>

             <DeletePost collab={collab} group={group}/>

          </div>

          <div className='py-8 '>
             <Details 
               collab={collab}
               group={group}
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
                        <UpdatePosts
                            group={group}
                            currentUser={currentUser}
                            setTrigger={setTrigger}
                            collab={collab}
                        />

                    </div>
                    
                
            </Modal>
    </>

  )
}




const Details=({collab,group})=>{
  const [reqs,setReq]=useState(collab?.requests)
    return(
        <div className='w-full py-4 bg-white h-full px-4 '>
        <div className='flex items-center border-b py-2  lg:px-4 px-1 justify-between w-full'>
              <div className='flex items-center space-x-3'>
                  <img
                    src={collab?.shared_by?.img}
                    className="rounded-full h-8 w-8"
                  />
                  <h5 className='text-lg font-semibold'>{collab?.shared_by?.name}</h5>

              </div>

              <div className='flex items-center space-x-4'>
                  <img 
                    src={share}
                    className="h-4 w-4"
                  />
                  <h5 className='text-sm font-semibold text-slate-600'>Share </h5>

              </div>

        </div>

         <div className='flex flex-col w-full py-6 space-y-8'>
              <div className='flex flex-col px-4 '>
                  <h5 className='font-light text-lg'>{collab?.eventPost?.title}</h5>
                  <h5 className='text-xs font-semibold text-slate-500'>1d ago</h5>

              </div>

              <div className='flex flex-col space-y-5 px-4 '>
        
                
                    <img
                      src={collab?.img_post}
                      className="w-full h-72"
                    />
                 
                  {/* <div className='flex flex-col space-y-2'>
                        <h5 className='font-semibold text-lg text-slate-600'>Description</h5>
                        <p className='font-light text-xs '>
                            {collab?.post?.body}
                        </p>

                  </div> */}
                  <div>
                     <EventCard 
                       collab={collab}
                       
                     />
                  </div>
              </div>

               <div className='flex flex-col px-4'>
                   {reqs?.map((req,index)=>{
                      return(
                       <RequestCard 
                        req={req}
                        group={group}
                        index={index}
                        collab={collab}
                        setReq={setReq}
                       />
                      )

                     })

                   }

              </div>
             
             
             

          </div>
       

   </div>
    )
}



const RequestCard=({req,group,index,collab,setReq})=>{
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    const [trigger,setTrigger]=useState(false)

  
      const color=[
          "",
          "rgba(197, 193, 251, 1)",
          "rgba(205, 247, 243, 1)",
          "rgba(254, 247, 197, 1)",
          "rgba(255, 198, 201, 1)"
      ]
     return(
          <div className='flex flex-col py-6 px-4 space-y-4 ' style={{background:`${color[randomNumber]}`}} >
              <div className='flex items-center justify-between'>
                    <h5 className='text-xl font-semibold'>{req?.title}</h5>
                    {trigger?
                        <AiOutlineClose
                        className='text-xl font-light'
                        onClick={()=>setTrigger(false)}
                      />
                      :
                      <RiArrowDownSLine 
                      className='text-3xl font-semibold'
                      onClick={()=>setTrigger(true)}
                    />
                      
  
                    }
                   
  
              </div>
              {trigger&&
                <div className='flex flex-col space-y-8 '>
                     <p>{req?.body}</p>
                     <div className='flex flex-col rounded-lg  w-full bg-white px-8 py-10'>
                       <h5 className='text-sm font-semibold'>Pending Request</h5>
                        <div className='flex flex-col '>
                           {req?.pending?.map((request)=>{
                             return(
                              <Request 
                                 request={request}
                                 group={group}
                                 index={index}
                                 collab={collab}
                                 setReq={setReq}
                              />
                             )
                           })

                           }
                        </div>
                       
                        
                  
                      </div>

                      <div className='flex flex-col rounded-lg  w-full bg-white px-8 py-10'>
                       <h5 className='text-sm font-semibold'>Accepted Partners</h5>
                        <div className='flex flex-col '>
                           {req?.partners?.map((partner)=>{
                             return(
                              <Partner
                                 partner={partner}
                              />
                             )
                           })

                           }
                        </div>
                       
                        
                  
                      </div>
                    
                </div>
               }
                
  
         </div>
  
     )
  }



  const EventCard=({collab})=>{
    return(
       <div className='flex flex-col space-y-4'>
           <div className='flex flex-col'>
               <h5 className='text-sm font-semibold'>Event Description</h5>
               <h5 className='text-sm font-light'>{collab?.eventPost?.body}</h5>

           </div>
           <div className='flex flex-col'>
               <h5 className='text-sm font-semibold'>Event Link</h5>
               <h5 className='text-sm font-light'>{collab?.eventPost?.link}</h5>

           </div>
           
           <div className='flex flex-col space-y-3'>

               <div className='flex items-center w-full justify-between'>
                   <h5>Date/Time</h5>
                   <h5>Location</h5>

               </div>
               <div className='flex items-center w-full justify-between'>
                   <h5 className='text-sm font-semibold'>{collab?.eventPost?.start_date}</h5>
                   <h5 className='text-sm font-light'>{collab?.eventPost?.start_time}</h5>
                   <h5 className='text-sm font-light'>{collab?.eventPost?.location}</h5>

               </div>
               <div className='flex items-center w-full justify-between'>
                   <h5 className='text-sm font-semibold'>{collab?.eventPost?.end_date}</h5>
                   <h5 className='text-sm font-light'>{collab?.eventPost?.end_time}</h5>
                   <h5 className='text-sm font-light'>{collab?.eventPost?.directions}</h5>

               </div>
              

           </div>

       </div>
    )

}

