import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Public(){
    return(
    <main>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center gap-10">
          <p className="text-3xl font-bold">برای باز شدن این قسمت اول ثبت نام یا وارد اکانت شوید</p>
          <Button>
            <Link href='/register'>
            برای ثبت نام کیلک کنید
            </Link>
          </Button>
        </div>
      </div>
    </main>
    )
}