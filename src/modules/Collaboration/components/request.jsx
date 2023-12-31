import React,{useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { collaborationApi } from '../_api';
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";




export default function Request({request,group,index,collab,setReq}){
    const [accepted,setAccept]=useState()
    const [errorMsg, setErrorMsg] = useState(null)
    const [ignore,setIgnore]=useState(false)
    const [open, setOpen] = useState(false);



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const accept=async()=>{
        setAccept(true)
         try{
            const response= await collaborationApi.acceptRequest(request,group,index,collab)
            response?.status&&setAccept(false)
            console.log(response?.reqs,"pppp")
            response?.status&&setReq(response?.reqs)
          }catch(e){
               console.log(e)
               setErrorMsg(e.message)
               setOpen(true)
          }

      }

      const ignoreRequest=async()=>{
        setIgnore(true)
         try{
            const response= await collaborationApi.ignoreRequest(request,group,index,collab)
            response?.status&&setIgnore(false)
            console.log(response?.reqs,"pppp")
            response?.status&&setReq(response?.reqs)
          }catch(e){
               console.log(e)
               setErrorMsg(e.message)
               setOpen(true)
          }

      }
     return(
      <div className='flex flex-col bg-white rounded-lg w-full space-y-2 '>
          <div className='flex items-center py-6 px-2 rounded-lg w-full justify-between'>
                  <div className='flex items-center space-x-4'>
                      <>
      
                          {request?.img?.length>0?
                              <img 
                                  src={request?.img}
                                  className="h-10 w-10 rounded-full"
                                />
                                  :
                                  <div className='rounded-full p-2 items-center justify-center flex border'
                                  >
                                  <h5 className='font-semibold text-sm'> {request?.firstName?.slice(0,1) +request?.lastName?.slice(0,1)}</h5>
                              </div>
                                  
  
                              }
                        
                      </>
                    
                      {request?.type?.length >0?
                          <div className='flex flex-col'>
                              <h5 className='text-xl font-semibold'>{request?.name}</h5>
                              <h5 className='text-sm '>{"Qorem ipsum dolor sit amet, consectetur adipiscing elit. "}</h5>
                          </div>
                              :
                              <div className='flex flex-col'>
                                  <h5 className='text-xl font-semibold'>{request?.firstName + " " + request?.lastName }</h5>
                                  <h5 className='text-sm '>{"Qorem ipsum dolor sit amet, consectetur adipiscing elit. "}</h5>
                            </div>
  
  
  
                      }
                    
              </div>
  
              <div className='flex items-center space-x-4 justify-end w-1/4'>
                      {ignore?
                          <ClipLoader 
                          color={"rgba(62, 51, 221, 1)"}
                      

                          />
                
                           :
                        <h5 className='text-slate-600 font-semibold text-lg'
                           onClick={()=>ignoreRequest()}  
                          >Ignore
                          </h5>

                        }
                  
                   {accepted?
                  
                          <ClipLoader 
                              color={"rgba(62, 51, 221, 1)"}
                          
      
                          />
                    
                        :
                      <button 
                          style={{background: "rgba(236, 235, 254, 1)"}}
                          className='text-blue-700 rounded-full text-xs px-4 py-1'
                          onClick={accept}
                      
                          > 
                        Accept
                        
                      </button>
                    }
  
              </div>
          <div>
          </div>
      </div>
        <div className='px-8'>
                <div className='bg-slate-200 py-3 px-4 h-20 rounded-lg'>
                    <h5 className='text-xs'>{request?.note}... see more. </h5>
  
  
                </div>
        </div>
  
  
        <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical:"top", horizontal:"center"}}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
               {errorMsg}
            </Alert>
         </Snackbar>
      </div>


     )
  }