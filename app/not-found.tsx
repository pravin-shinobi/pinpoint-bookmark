// app/not-found.tsx
"use client";

import { Button } from "@/components/ui/button";
import { HiOutlineBookmark, HiOutlineHome, HiOutlineArrowLeft } from "react-icons/hi";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen pt-40 bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Animated 404 Graphic */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          {/* Floating Bookmarks */}
          <div className="relative inline-block">
            {/* Main 404 Text */}
            <h1 className="text-9xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              404
            </h1>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Oops! It seems this bookmark has been misplaced or doesn't exist anymore.
          </p>
          <p className="text-md text-gray-500 dark:text-gray-500 mb-12">
            The page you're looking for might have been moved, deleted, or never existed.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="border-2 h-14 px-8 text-base"
          >
            <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
          
          <Link href="/">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white h-14 px-8 text-base w-full sm:w-auto"
            >
              <HiOutlineHome className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}