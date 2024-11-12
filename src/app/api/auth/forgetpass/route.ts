import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/nodemailer';
import { sql } from '@vercel/postgres';
import { NextResponse } from "next/server"

export  async function POST(
  request: Request, 
  respond: Response,
) {
  const { email } = await request.json();
  try{
    if(email){
    const resetToken = crypto.randomBytes(64).toString('hex')

    const newdata = await sql`
    UPDATE users
    SET resettoken = ${resetToken}
    WHERE email = ${email}
`
    await sendPasswordResetEmail(email, resetToken);
    return NextResponse.json({success:true , message : "ایمیل ارسال شد"})
  }
  }catch(err){
    return NextResponse.json({ message: "اختلال در سرور" })
  }
  
  
}