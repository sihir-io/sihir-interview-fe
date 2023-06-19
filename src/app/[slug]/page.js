'use client'

import {useEffect, useState} from "react";


import {usePathname, useRouter} from 'next/navigation'
import sihirApiClient from "@/helpers/axios";

const getNewQuestion = async (slug) => {
    return await sihirApiClient.get(`/v1/applications/${slug}/questions/new`)
}

export default function Home() {
    let pathname = usePathname()
    const router = useRouter()

    let slug = pathname.split('/')[1]
    const [email, setEmail] = useState("");

    useEffect(() => {
    })


    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black justify-around">
            <div>
                <h1>
                    Welcome to Sihir Interview, {'Anaci'}
                </h1>
                <p>
                    Please press on Start button to start the interview.
                </p>
            </div>

            <div
                className={'flex flex-col items-center justify-between'}>
                <button
                    onClick={
                        () => {
                            if (!slug) {
                                router.push('/404')
                            }
                            getNewQuestion(slug)
                                .then(
                                    (res) => {

                                        //    res is axios response object

                                        //     check if result is status 200
                                        const data = res.data
                                        if (res.status === 204) {
                                            router.push('/done')
                                            router.refresh()
                                        } else if (res.status > 200 || !data) {
                                            router.push('/error')
                                        }
                                        //    set async storage
                                        else {
                                            localStorage.setItem('interview_obj', JSON.stringify(data))
                                            router.push(`/${slug}/interview`)
                                        }
                                    }
                                ).catch((err) => {
                                console.log(err)
                                router.push('/error')
                            })
                        }
                    }
                    className={'bg-blue-500 text-white rounded-md p-2 w-96  mt-4'}
                >Start
                </button>
            </div>

        </main>
    )
}
