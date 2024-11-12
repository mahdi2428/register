"use client"
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
export default function Secret(){
    return(
    <main>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center gap-10">
          <p className="text-3xl font-bold">شما با موفقیت وارد شدید</p>
          <Button onClick={()=>signOut()}>
            خارج شوید
          </Button>
        </div>
      </div>
    </main>
    )
}