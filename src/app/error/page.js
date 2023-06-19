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
                    'text-4xl font-bold text-center mb-4 text-red-500 '
                }>
                    Error
                </h1>
                <p className={
                    'text-center mb-4 text-red-500'
                }>
                    There was an error. Please try again later.
                </p>
            </div>
        </main>
    )
}
