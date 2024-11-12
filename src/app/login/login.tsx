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
import {signIn} from 'next-auth/react'
import { useRouter,redirect } from "next/navigation";
import { getServerSession } from "next-auth";
 

const FormSchema = z.object({
  email: z.string().email("ایمیل اشتباه است"),
  password: z.string().min(8, "رمز باید 8 کارکتر یا بیشتر باشد"),
});

type FormData = z.infer<typeof FormSchema>;

export default  function Login() {
  
  const router = useRouter()
  const form = useForm<FormData>({
    defaultValues:{
        email:"",
        password:""
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async(data: FormData) => {
    const respond = await signIn('credentials',{
        email : data.email,
        password : data.password,
        redirect : false
    })
    if(respond?.error === null){
      alert("خوش امدید ")
      router.push('/')
      router.refresh()
    }else{
      alert("رمز اشتباه است")
    }
  };

  return (
    <main dir="rtl" className="h-screen w-screen flex justify-center items-center">
      <div className="border rounded-2xl p-10 ">
        <p className="text-2xl font-bold text-center"> خوش آمدید</p>
        <Form {...form}>
          <form className="flex flex-col gap-7" onSubmit={form.handleSubmit(onSubmit)}>
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

            <FormItem>
              <FormLabel>رمز عبور</FormLabel>
              <FormField
                name="password" 
                render={({ field }) => (
                  <FormControl>
                    <div>
                      <Input {...field} type="password" />
                      <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                    </div>
                  </FormControl>
                )}
              />
            </FormItem>
            <div>
                <p>اگر رمز خود را فراموش کرده اید <Link className="text-blue-400" href='/forgotpassword'>کلیک کنید</Link ></p>
                <p>اگر هنوز ثبت نام نکرده اید اینجا <Link className="text-blue-400" href='/register'>کلیک کنید</Link ></p>
            </div>
            <Button type="submit">ثبت نام</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}