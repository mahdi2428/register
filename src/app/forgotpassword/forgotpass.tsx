"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter,redirect } from "next/navigation";
import { getServerSession } from "next-auth";
 

const FormSchema = z.object({
  email: z.string().email("ایمیل اشتباه است"),
});

type FormData = z.infer<typeof FormSchema>;

export default  function ForgotPassword() {
  
  const router = useRouter()
  const form = useForm<FormData>({
    defaultValues:{
        email:""
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async(data: FormData) => {
    try {
       await fetch('http://localhost:3000/api/auth/forgetpass', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then((res)=>res.json()).then((data)=>{
        if(data.success){
          alert(data.message)
          router.push('/login')
          router.refresh()
        }
      })

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main dir="rtl" className="h-screen w-screen flex justify-center items-center">
      <div className="border rounded-2xl p-10 ">
        <p className="text-2xl font-bold text-center"> خوش آمدید</p>
        <Form {...form}>
          <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel>ایمیل</FormLabel>
              <FormField
                name="email"
                render={({ field }) => (
                  <FormControl>
                    <div>
                      <Input {...field} type="email" />
                      <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                    </div>
                  </FormControl>
                )}
              />
            </FormItem>
            <Button type="submit">ارسال ایمیل</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}