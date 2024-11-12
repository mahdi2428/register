import { getServerSession } from "next-auth";
import Ressetpass from "./resetpass";
import { redirect } from "next/navigation";
interface Params {
    token: string; 
}

interface ResetPassPageProps {
    params: Params; 
}

 const RessetPassPage:React.FC<ResetPassPageProps> = async({params})=>{
    const session = await getServerSession()
    if(session){
        redirect('/')
    }  
    return(
        <Ressetpass token={params.token}/>
    )
}

export default RessetPassPage