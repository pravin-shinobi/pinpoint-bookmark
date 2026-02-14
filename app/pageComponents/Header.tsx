"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/use-theme'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    HiOutlineUser,
    HiOutlineBookmark,
    HiOutlineCog,
    HiOutlineLogout,HiOutlineCreditCard,
    HiOutlineSupport
} from "react-icons/hi";
import Link from "next/link";
import { Home, Moon, Sun } from 'lucide-react'
import { Switch } from '@/components/ui/switch'


const Header = () => {
    const { user, loading,logout } = useAuth();
    const pathname = usePathname();
     const { theme, toggleTheme } = useTheme();

    if (pathname == "/login") return null;

    return (
        <div>

            <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href={"/"} className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                                <HiOutlineBookmark className="w-6 h-6 text-white" />
                            </div>
                            <span className="lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Pinpoint Bookmarks
                            </span>
                        </Link>

                        {loading ? null :

                            !loading && user ?
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                            <Avatar className="h-10 w-10 border-2 border-purple-200 hover:border-purple-500 transition-colors">
                                                <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name} />
                                                <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                                    {user?.user_metadata?.full_name}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-64 mt-2" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user?.user_metadata?.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuGroup className='space-y-2 mt-3'>
        
                                            <DropdownMenuItem asChild>
                                                {pathname == "/dashboard" ?

                                                    <Link href={`/`} className="cursor-pointer">
                                                        <Home className="mr-2 h-4 w-4" />
                                                        <span>Home</span>
                                                    </Link>
                                                    :
                                                    <Link href={`/dashboard`} className="cursor-pointer">
                                                        <HiOutlineBookmark className="mr-2 h-4 w-4" />
                                                        <span>My Bookmarks</span>
                                                    </Link>
                                                }
                                            </DropdownMenuItem>

                        
                                            <DropdownMenuItem asChild>
                                                <div className="cursor-pointer">
                                                    {theme == "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                                                    Switch to {`${theme == "dark" ? "Light" : "Dark"} Mode`}
                                                    <Switch checked={theme == "dark"} onCheckedChange={toggleTheme} />
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>

                                        <DropdownMenuItem
                                            onClick={logout}
                                            disabled={loading}
                                            className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                                        >
                                            <HiOutlineLogout className="mr-2 h-4 w-4" />
                                            <span>{"Log out"}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                :

                                <div className="flex items-center space-x-4">
                                    <div
                                        onClick={toggleTheme}
                                        role="button"
                                        className="relative w-[50px] h-[26px] bg-slate-300 dark:bg-slate-600 rounded-full cursor-pointer transition-colors duration-300"
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"} `}
                                        >
                                            {theme === "dark" ? (
                                                <Sun className="h-3 w-3 text-black" />
                                            ) : (
                                                <Moon className="h-3 w-3 text-black" />
                                            )}
                                        </div>
                                    </div>

                                    <Button className="hidden lg:block select-none bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity">
                                        Get Started Free
                                    </Button>
                                    <Link href="/login" className=" text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors">
                                        Sign In
                                    </Link>
                                </div>
                        }



                    </div>
                </div>
            </nav>



        </div>
    )
}


export default Header
