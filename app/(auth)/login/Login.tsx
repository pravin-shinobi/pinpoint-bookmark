
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineBookmark } from "react-icons/hi";

import {createClient} from "@/utils/supabase/client";

export default function Login() {

    const supabase = createClient();

    const handleLogin=async()=>{
        await supabase.auth.signInWithOAuth({
            provider:"google",
            options:{
                redirectTo:`${process.env.NEXT_PUBLIC_VERCEL_APP}/dashboard`
            }
        })
    }

    return (
        <div className="flex h-screen w-full overflow-hidden select-none">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block lg:w-1/2 relative"
            >
                <div className="absolute inset-0 bg-gradient-to-r to-indigo-500/20 from-slate-700/20 z-10 mix-blend-multiply" />
                <div className="relative h-full w-full">
                    <Image
                        src="https://images.unsplash.com/vector-1756774242787-e9934676446b?q=80&w=580&auto=format&fit=crop"
                        alt="Modern workspace setup"
                        fill
                        className="object-cover" unoptimized draggable={false}
                        priority
                    />
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute bottom-7 left-12 z-20 text-white/75"
                    >
                        <h1 className="text-3xl font-bold mb-4">Welcome to</h1>
                        <h2 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-5xl underline font-bold">
                            Pinpoint Bookmarks
                        </h2>
                        <p className="text-xl text-black mt-4 opacity-90">Where ideations are marked</p>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
            >
                <Card className="w-full max-w-md shadow-2xl  border-0 overflow-hidden">

                    <div className="h-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 relative" />
                    <span className="absolute top-[20px] right-3 font-bold flex items-center font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                         <div className="size-6 mr-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                                    <HiOutlineBookmark className="size-4 text-white" />
                                  </div >Pinpoint Bookmarks</span>
                    <CardHeader className="text-center space-y-2 pt-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                            <CardTitle className="text-4xl font-black mb-2">
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    Hello Again!
                                </span>
                            </CardTitle>
                        </motion.div>
                        <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                            Welcome back! Please sign in / sign up to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 px-8 pb-8">
                        <motion.div
                            className="flex justify-center"
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <div className="w-20 h-20 rounded-2xl border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <FcGoogle className="w-10 h-10" />
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button onClick={handleLogin}
                                className="w-full h-12 text-lg font-medium bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 text-gray-800 border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group cursor-pointer"
                                variant="outline"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 " />
                                <FcGoogle className="mr-3 h-6 w-6 relative z-10" />
                                <span className="relative z-10 text-sm">Continue with Google</span>
                            </Button>
                        </motion.div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-100 dark:bg-gray-800 px-4 py-1 text-gray-500 dark:text-gray-400 rounded-full">
                                    Secure Login
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4 text-gray-400">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="text-sm">Encrypted & Secure</span>
                        </div>

                        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
                            By continuing, you agree to our{" "}
                            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors">
                                Terms
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors">
                                Privacy
                            </a>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}