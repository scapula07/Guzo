import React from 'react'
import Layout from "../../Layout"
import { Link } from 'react-router-dom'
export default function Settings() {
  return (
    <Layout>
         <div className='py-2 flex-col flex space-y-4'> 
            <h5 className='text-slate-700 font-semibold text-xl'>Settings</h5>
           
          </div>

          <div className='flex flex-col w-full space-y-4  '>
              <Card 
                    title="Profile Information & Accounts"
                    body={[
                      {
                       text: "Edit Profile",
                       link:""
                      },
                      {
                        text: "Teammates",
                        link:"/team"

                      },
                      {
                        text: "Delete account",
                        link:""

                      }
                      ]}
              
                />
              {/* <Card 
                  title="Subscriptions and Payments"
                  body={["Billing Information","Manage Subscription","View Payment History"]}
              />
              <Card 
                  title="Monetization & Privacy"
                  body={["Manage Ecosystem Privacy","Setup Paywall"]}
              /> */}

          </div>

    </Layout>
   
  )
}


const Card=({title,body})=>{
     return(
        <div className='bg-white w-3/4 flex flex-col space-y-4 px-8 py-6'>
            <h5 className='text-sm font-semibold'>{title}</h5>
            {body?.map((option)=>{
                 return(
                    <>
                     {option?.text!="Delete account"&&
                     <Link to={option?.link}>
                   
                        <h5 className='text-sm font-light'>{option?.text}</h5>
                    </Link>
                        }
                    {option?.text==="Delete account"&&
                      <h5 className='text-sm font-light text-red-600' >{option?.text}</h5>

                     }
                     </>
                 )
            })

            }

        </div>
     )
}