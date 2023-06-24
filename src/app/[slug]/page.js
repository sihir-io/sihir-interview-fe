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
    const [isValid, setIsValid] = useState(!!localStorage.getItem(`${slug}-user`));
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, [])

    if (!isValid) {
        return (
            <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black justify-between pb-24">
                <div className={''}>
                    <h1 className={'text-2xl'
                    }>
                        Welcome to Sihir Interview,
                    </h1>
                    <p className={'text-sm pt-24'}>
                        Firstly, please enter the email you have received the invitation to verify your identity.
                    </p>
                </div>
                <div className={'flex flex-col items-center justify-center'}>
                    <div className={'flex flex-col items-start justify-between' + ' w-96'}>
                        <label
                            className={'text-gray-500 text-sm'}
                            htmlFor="email">Email</label>
                    </div>
                    <input
                        className={'border-2 border-gray-300 rounded-md p-2 w-96  mt-4'}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}/>
                    <button
                        onClick={() => {
                            setLoading(true)
                            sihirApiClient.put(`/v1/applications/${slug}/verify-email`, {email: email}).then((res) => {
                                if (res.status !== 200) {
                                    setError(true)
                                } else {
                                    setError(false)
                                    setIsValid(true)
                                    setUser(res.data)
                                    localStorage.setItem(`${slug}-user`, JSON.stringify(res.data))
                                }
                            }).catch((err) => {
                                setError(true)
                            })

                            setLoading(false)
                        }}
                        className={'bg-blue-500 text-white rounded-md p-2 w-96  mt-4'}
                    >{loading ? 'Loading' : (error ? 'Wrong Email' : 'Verify')}
                    </button>

                </div>
            </main>

        )
    }


    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black justify-around">
            <div>
                <h1>
                    Welcome {user?.name},
                </h1>
                <p>
                    You can start the interview by clicking the button below.
                </p>
                <h2>
                    Disclaimer
                </h2>
                <p className={
                    'text-sm text-gray-500'
                }>
                    Please note that the interview will be recorded and stored on our servers. This recording will be
                    used for the purpose of evaluating your interview performance and will be deleted after 30 days.
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
                                            router.push(`/${slug}/interview/${data.id_ref}`)
                                        }
                                    }
                                ).catch((err) => {
                                console.log(err)
                                router.push('/error')
                            })
                        }
                    }
                    className={'bg-blue-500 text-white rounded-md p-2 w-96  mt-4'}
                >
                    New Question
                </button>
            </div>

        </main>
    )
}
