'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SignInButton = () => {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {session ? (
                <div className="relative">
                    <button
                        className="rounded-full focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {session?.user?.avatar ? (
                            <div className="relative h-10 w-10">
                                <Image
                                    src={session.user.avatar}
                                    alt={session.user.name}
                                    className="inline-block rounded-full"
                                    fill
                                />
                            </div>
                        ) : (
                            <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                                <svg
                                    className="h-full w-full text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                        )}
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 origin-top-right rounded-xl py-6 text-white bg-gray-800 shadow-lg">
                            <div className="mb-4 flex gap-4 px-6 text-sm">
                                {session?.user?.avatar ? (
                                    <div className="relative h-10 w-10">
                                        <Image
                                            src={session.user.avatar}
                                            alt={session.user.name}
                                            className="inline-block rounded-full"
                                            fill
                                        />
                                    </div>
                                ) : (
                                    <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                                        <svg
                                            className="h-full w-full text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </span>
                                )}
                                <div>
                                    <p className="font-medium text-gray-300">
                                        {session.user.name || "User name"}
                                    </p>
                                    <p className="text-gray-400">{session.user.email}</p>
                                </div>
                            </div>
                            <Link href="/profile" className="block w-full px-6 py-2 text-sm text-left text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/assets/setting.svg"
                                        alt="logout"
                                        width={24}
                                        height={24}
                                    />
                                    <span>Manage Account</span>
                                </div>
                            </Link>
                            <button
                                className="block w-full px-6 py-2 text-sm text-left text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                                onClick={() => signOut()}
                            >
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/assets/logout-gray.svg"
                                        alt="logout"
                                        width={24}
                                        height={24}
                                    />
                                    <span>Sign Out</span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex gap-2">
                    <button
                        className="rounded-md border border-green-500 text-gray-900 px-3 py-1 text-sm flex items-center gap-2 focus:outline-none"
                        onClick={() => signIn()}
                    >
                        <Image
                            src="/assets/signin.svg"
                            alt="login"
                            width={24}
                            height={24}
                        />
                        <span>Sign In</span>
                    </button>

                    <Link
                        href={"/signup"}
                        className="rounded-md border border-green-500 text-gray-900 px-3 py-1 text-sm flex items-center gap-2 focus:outline-none"
                            >
                        Sign Up
                    </Link>
                </div>
            )}
        </>
    );
};

export default SignInButton;