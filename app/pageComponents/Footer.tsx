"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiOutlineBookmark } from 'react-icons/hi';

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"]
  },
  {
    title: "Resources",
    links: ["Blog", "Documentation", "Guides", "Support"]
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"]
  }
];

const Footer = () => {
    const pathname = usePathname();

    const paths= ["/login","/dashboard"];

    if(paths.includes(pathname)) return null;
    
    return (
        <div>
            {/* Footer */}
            <footer className="py-12 px-6 bg-gray-900 text-white">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                                    <HiOutlineBookmark className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xl font-bold select-none">Pinpoint Bookmarks</span>
                            </div>
                            <p className="text-gray-400 text-sm select-none">Smart bookmarking for the modern web</p>
                        </div>
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h4 className="font-semibold mb-4 select-none">{section.title}</h4>
                                <ul className="space-y-2 text-gray-400">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                                }}
                                            className="hover:text-white transition-colors">
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t select-none border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
                        © {new Date().getFullYear()} Pinpoint Bookmark. All rights reserved.
                    </div>
                    <div className="text-center select-none text-gray-400 text-sm">
                        Made by Pravin
                </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
