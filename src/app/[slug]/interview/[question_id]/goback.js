'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default async function GoBack() {
    const router = useRouter()
    useEffect(() => {

        router.push('/done')
    }, [])
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
            <h1>
                Going back
            </h1>
        </div>
    )
}