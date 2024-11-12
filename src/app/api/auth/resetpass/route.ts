import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request, 
  respond: NextApiResponse
) {
  
  const { token, newPassword } = await request.json();
  try {
    
    const userResult = await sql`
      SELECT * FROM users 
      WHERE 
        resettoken = ${token}  
    `;
    console.log(userResult)
    if(userResult){
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await sql`
      UPDATE users 
      SET 
        password = ${hashedPassword}, 
        resetToken = NULL
      WHERE resettoken = ${token}  
    `;
    return NextResponse.json({ message: 'رمز با موفقیت تغییر کرد' })
    }else{
        console.log("تغییر رمز انجام نشد")
    }

    

  } catch (error) {
    return NextResponse.json({ message: "اختلال در سرور" })
  }
}