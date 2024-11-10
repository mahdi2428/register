import type { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import  CredentialsProvider  from "next-auth/providers/credentials";
export const options:NextAuthOptions ={
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECERT as string
        }),
        CredentialsProvider({
            name: 'Credentail',
            credentials: {
                username : {
                    label : "username : ",
                    type : "text",
                    placeholder : "cool-name"
                },
                password : {
                    label : "password :",
                    type : "password"
                }
            },
            async authorize(credentials){
                const user = { id: "42", username: 'amir', password: "amir1379" }; 

                if (credentials?.username === user.username && credentials?.password === user.password) {
                    return user;
                } else {
                    return null; 
                }
            }
        })
    ],
}