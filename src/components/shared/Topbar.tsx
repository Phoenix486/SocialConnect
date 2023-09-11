'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SignInButton from "./SigninButton";

function Topbar() {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <nav className='topbar'>
      <Link href='/' className='flex items-center gap-2'>
        <Image 
          src='/Logo.jpg'
          alt='logo'
          width={35}
          height={35}
          className="rounded-full"
        />
        <p className='max-xs:hidden'>Social Connect</p>
      </Link>
      <SignInButton />
    </nav >
  );
}

export default Topbar;
