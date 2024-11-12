import type { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import  CredentialsProvider  from "next-auth/providers/credentials";
import { compare } from 'bcrypt'
import { sql } from "@vercel/postgres";


export const options:NextAuthOptions ={
    session :{
        strategy :"jwt"
    },
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECERT as string
        }),
        CredentialsProvider({
            name: 'Credentail',
            credentials: {
                email : {
                    type : "text",
                },
                password : {
                    type : "password"
                }
            },
            async authorize(credentials ,req){
                const respond = await sql`
                SELECT * FROM users WHERE email = ${credentials?.email}`
                const user =respond.rows[0]

                const passwordCompartion = await compare(credentials?.password|| "", user.password)
                console.log({passwordCompartion})

                if(passwordCompartion){
                    return{
                        id : user.id ,
                        email : user.email
                    }
                }

                return null
            }
        })
    ],
}