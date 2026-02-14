"use client"

import { useEffect, useState } from "react";


type Theme = "light" | "dark";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>("light");


    useEffect(() => {
        const savedMode = localStorage.getItem("PinpointTheme") as Theme || null;

        if (savedMode) {
            setTheme(savedMode);
            document.documentElement.classList.toggle("dark", savedMode == "dark");
        } else {
            const prefered = window.matchMedia("(prefers-color-scheme:dark)").matches;
            const systemTheme: Theme = prefered ? "dark" : "light";
            setTheme(systemTheme);
            document.documentElement.classList.toggle("dark", systemTheme == "dark")
        }

    }, [])


    const toggleTheme = () => {
        const newTheme: Theme = theme == "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("PinpointTheme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    }

    return { theme, toggleTheme };
}