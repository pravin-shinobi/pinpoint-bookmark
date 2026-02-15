import React, { useState, useEffect } from 'react';
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';

const ScrollUp = () => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleShow = () => {
            const scrolledDown = window.pageYOffset || document.documentElement.scrollTop;
            setShow(scrolledDown > 100);
        };

        window.document.addEventListener("scroll", handleShow);
        return () => window.document.removeEventListener("scroll", handleShow);

    }, [])

    const scrolltotop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <>
            {show &&
                <motion.div
                    key={"scroll-btn"}
                    initial={{ scale: 0, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 1000, damping: 20 }}
                    className='fixed bottom-16 right-12'
                >
                    <AnimatePresence>
                        <div onClick={scrolltotop} className='cursor-pointer  bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-2'>
                            <ArrowUp className='text-white' size={20} />
                        </div>
                    </AnimatePresence>
                </motion.div>
            }
        </>
    )
}


export default ScrollUp;
