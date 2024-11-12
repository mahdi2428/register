import { getServerSession } from "next-auth"
import ForgotPassword from "./forgotpass"
import { redirect } from "next/navigation"

const ForgotPasswordPage = async()=>{
  const session = await getServerSession()
    if(session){
        redirect('/')
    }  
  return(
    <ForgotPassword />
  )
}