"use client"

import PageNotFound from "../not-found";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useAuth();


    if (typeof window != "undefined" && user) {
        return (
            <>{children}</>
        );
    } else {
        return <PageNotFound />;
    }
}
