'use client'

import {useEffect} from "react";

export default function Home() {
//    To directly redirect users to a different webpage use the following:
    useEffect(() => {
        window.location.href = 'https://sihir.io'
    }, [])


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            Welcome to Sihirterview
        </main>
    )
}
