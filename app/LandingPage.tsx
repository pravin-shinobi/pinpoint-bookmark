
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { 
  HiOutlineCollection, 
  HiOutlineSearch, 
  HiOutlineFolder,
  HiOutlineTag,
  HiOutlineShare,
  HiOutlineCloud
} from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function LandingPage() {

  const {user} = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Toaster/>

      {/* Hero Section - Split Design */}
      <section className="pt-32 pb-16 lg:pb-20 mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-left select-none"
            >
              <div className="inline-flex items-center select-none px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 mb-6">
                <BsStars className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">The Smart Way to Bookmark</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                Organize Your Digital
                <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  World with Pinpoint
                </span>
              </h1>
              <p className="text-base lg:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                Never lose an important webpage again. Pinpoint helps you save, organize, and rediscover your favorite content with intelligent bookmarking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button onClick={()=>{
                  if(user){
                    router.push('/dashboard')
                  }else{
                    toast.info("Sign up for proceeding further",{position:"bottom-right"})
                    router.push('/login')
                  }
                }} size="lg" className="text-sm md:text-lg cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity h-14 px-8">
                  Start Organizing Free
                </Button>
                <Button size="lg" onClick={()=>toast.info("Start creating bookmarks",{style:{background:"#000",color:"#fff"}})} variant="outline" className="cursor-pointer h-14 px-8 text-sm md:text-lg border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  Watch Demo
                </Button>
              </div>

              {/* Google Sign Up - Prominent but not overwhelming */}
          { !user && <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-start">
                  <span className="dark:bg-slate-500 dark:text-white rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">Or continue with</span>
                </div>
              </div>}
              
              {user ? 

              <Link href={'/dashboard'} className="text-sm md:text-base hover:bg-indigo-100 duration-200 dark:text-gray-600 flex items-center gap-2 bg-slate-200 rounded mt-4 w-fit p-2">
                <PlusCircle size={16}/> Create Bookmarks
              </Link>
              :
              <Button
                variant="outline"
                className="mt-4 h-12 px-6 text-base bg-white hover:bg-gray-50 border-2"
              >
                    <Link href={'/login'} className="flex items-center gap-2 text-sm md:text-base">
                      <FcGoogle className="mr-3 h-5 w-5" />
                      Sign up with Google
                    </Link>
              </Button>
                }
            </motion.div>

            {/* Right Content - Image/Visual */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative"
            >
              <div className="hidden lg:block relative h-[480px]">
                {/* Main Dashboard Preview */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-3xl transform rotate-5 scale-105" />
                <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="h-12 bg-gray-100 dark:bg-gray-700 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="flex-1 flex justify-center">
                      <div className="w-64 h-6 bg-gray-200 dark:bg-gray-600 rounded-full" />
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    {Array.from({length:4}).map((_,i) => (
                      <div key={i} className="h-32 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg mb-2" />
                        <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="lg:py-20 mx-3 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 select-none"
          >
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Master Your Bookmarks
              </span>
            </h2>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features that make bookmarking actually useful, not just a list of links.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-shadow border-2 hover:border-purple-200 dark:hover:border-purple-800">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Screen Demo Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl" />
                <Image
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&auto=format&fit=crop"
                  alt="Organized bookmarks"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl relative z-10"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1 select-none"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Intelligent Organization,
                <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Zero Effort
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-6">
                Pinpoint automatically categorizes your bookmarks using AI, making it easy to find exactly what you need when you need it.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-base lg:text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing/CTA Section */}
      <section className="w-[80%] lg:w-[85%] mx-auto mb-20 py-20 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg">
        <div className=" text-center select-none">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Organized?</h2>
            <p className="lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of users who've transformed how they save and discover content online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white cursor-not-allowed text-purple-600 hover:bg-gray-100 text-sm h-14 px-8">
                Start Free Trial
              </Button>
              <Link href={'/login'}>
             {!user && <Button size="lg" variant="default" className="border-white dark:bg-black text-white text-sm h-14 px-8">
                <FcGoogle className="mr-2" />
                Sign Up with Google
              </Button>}
              </Link>
            </div>
            <p className="text-sm mt-4 opacity-75">No credit card required • Free forever plan available</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

// Data arrays
const features = [
  {
    icon: <HiOutlineCollection className="w-6 h-6 text-white" />,
    title: "Smart Collections",
    description: "AI-powered auto-categorization of your bookmarks into intelligent collections."
  },
  {
    icon: <HiOutlineSearch className="w-6 h-6 text-white" />,
    title: "Powerful Search",
    description: "Search through your bookmarks, including page content and your notes."
  },
  {
    icon: <HiOutlineFolder className="w-6 h-6 text-white" />,
    title: "Unlimited Folders",
    description: "Create nested folders and organize your bookmarks your way."
  },
  {
    icon: <HiOutlineTag className="w-6 h-6 text-white" />,
    title: "Smart Tags",
    description: "Automatic tagging based on content, plus custom tags for your organization."
  },
  {
    icon: <HiOutlineShare className="w-6 h-6 text-white" />,
    title: "Easy Sharing",
    description: "Share collections with team members or make them public."
  },
  {
    icon: <HiOutlineCloud className="w-6 h-6 text-white" />,
    title: "Cloud Sync",
    description: "Access your bookmarks from anywhere, on any device."
  }
];

const benefits = [
  "AI automatically categorizes new bookmarks",
  "Full-text search of saved pages",
  "Collaborate with team members",
  "Browser extensions",
  "Mobile apps for iOS and Android",
  "Export your data anytime"
];
