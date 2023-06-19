'use client'

import {useEffect, useState} from "react";


import {usePathname, useSearchParams} from 'next/navigation'

export default function Home() {
    let pathname = usePathname()

    const [email, setEmail] = useState("");
    useEffect(() => {
        const slug = pathname.split('/')[1]
        console.log(slug)
        // const slug = props.router.query.slug
    })

    //Error page
    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black justify-around">
            <div>
                <h1 className={
                    'text-4xl font-bold text-center mb-4 text-green-500 '
                }>
                    Congratulations!
                </h1>
                <p className={
                    'text-center mb-4 text-black text-2xl'
                }>
                    You have successfully completed the interview. Please wait to hear for the results.
                    Wishing you the best of luck!
                </p>
            </div>
        </main>
    )
}
