import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { sql } from "@vercel/postgres";
export async function POST(request : Request){
    try{
        const {email , password , fristname , lastname} = await request.json()
        console.log({email,password,fristname,lastname})

        const hashedpassword = await hash(password , 10)

        const respond = await sql`
        INSERT INTO users (email,password,fristname,lastname)
        VALUES (${email} , ${hashedpassword} , ${fristname} ,${lastname})
        `
        return NextResponse.json({success : true , message : "با موفقیت ثبت نام شدید"})

    }catch(e){
        return NextResponse.json({ message: "اختلال در سرور" })
    }

    
}