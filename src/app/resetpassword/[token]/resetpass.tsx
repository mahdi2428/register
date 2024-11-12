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
import { useRouter } from "next/navigation";
 

const FormSchema = z.object({
    password: z.string().min(8, "رمز باید 8 کارکتر یا بیشتر باشد"),
    comfrimpassword : z.string().min(8, "رمز باید 8 کارکتر یا بیشتر باشد")
});

type FormData = z.infer<typeof FormSchema>;

  interface Tokentype  {
    token : string
  }


  const Ressetpass:React.FC<Tokentype>=({token}) =>{
  const router = useRouter()
  const form = useForm<FormData>({
    defaultValues:{
        password:"",
        comfrimpassword : ""
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async(data: FormData) => {
    try {
      if(data.password === data.comfrimpassword){
       await fetch('http://localhost:3000/api/auth/resetpass', {
        method: 'POST',
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify({token:token, newPassword : data.comfrimpassword})
      }).then((res)=>res.json()).then((data)=>{
        if(data.success){
          alert(data.message)
          router.push('/login')
          router.refresh()
        }
      })
    }else{
      alert("رمز ها با هم تطابق ندارند")
    }
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
              <FormLabel> رمز جدید</FormLabel>
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
            <FormItem>
              <FormLabel>تکرار رمز </FormLabel>
              <FormField
                name="comfrimpassword" 
                render={({ field }) => (
                  <FormControl>
                    <div>
                      <Input {...field} type="password" />
                      <FormMessage>{form.formState.errors.comfrimpassword?.message}</FormMessage>
                    </div>
                  </FormControl>
                )}
              />
            </FormItem>
            <Button type="submit">تغییر رمز</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default Ressetpass