import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Secret from "./pages/secret";
import Public from "./pages/public";
export default async function Home() {
  const session = await getServerSession()

  return (
    <>
    {session ? 
    <Secret />
    :
    <Public/>}
    </>
  );
}
