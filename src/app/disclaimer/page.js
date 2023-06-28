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
                    Disclaimer
                </h1>
                <p className={
                    'text-center mb-4 '
                }>

                    Disclaimer: User Video Data Interpretation Application

                    This disclaimer ("Disclaimer") is intended to outline the terms and conditions governing the use of
                    the User Video Data Interpretation Application ("Application"). By using the Application, you
                    ("User") acknowledge and agree to be bound by the terms and conditions stated herein. Please read
                    this Disclaimer carefully before using the Application.

                    Application Nature and Purpose:
                    The Application utilizes video data provided by the User to interpret and analyze various aspects,
                    including but not limited to facial expressions, gestures, emotions, and actions. The purpose of the
                    Application is to provide insights, suggestions, or recommendations based on the interpreted data.
                    It is important to note that the Application does not guarantee absolute accuracy or infallibility
                    of the interpretation results, and the User should exercise discretion and judgment in relying on
                    the Application's output.

                    Data Privacy and Protection:
                    a. Data Collection and Processing: The Application requires access to the User's video data for
                    interpretation. The video data is processed locally on the User's device, and no video data is
                    stored or transmitted to any external servers without the explicit consent of the User.

                    b. Purpose and Legitimate Basis: The User's video data is processed solely for the purpose of
                    providing interpretation services through the Application. The legitimate basis for processing the
                    video data is the User's consent and the necessity for the performance of the Application's
                    services.

                    c. Data Retention: The video data processed by the Application is not stored on any external servers
                    or retained beyond the duration necessary to provide the interpretation services. Once the
                    interpretation is completed, the video data is promptly deleted from the Application's memory.

                    d. Third-Party Processing: The Application may utilize third-party service providers to facilitate
                    certain features or functions. These third-party processors are carefully selected, and they are
                    required to comply with all applicable data protection laws and regulations.

                    e. Data Security: Reasonable technical and organizational measures are implemented to safeguard the
                    User's video data against unauthorized access, disclosure, alteration, or destruction. However, no
                    security measures are perfect, and the Application cannot guarantee absolute security of the User's
                    video data.

                    Accuracy and Reliability:
                    The Application's interpretation results are based on advanced algorithms and machine learning
                    techniques. While the Application strives for accuracy and reliability, it is important to note that
                    the interpretation results may vary and may not always be completely accurate. The User acknowledges
                    that the Application's interpretations are provided "as is," and the Application shall not be held
                    responsible for any inaccuracies, errors, or omissions in the interpretation results.

                    User's Responsibilities:
                    a. Informed Consent: By using the Application, the User confirms that they have read and understood
                    this Disclaimer and provides informed consent for the processing of their video data for the
                    purposes described herein.

                    b. Individual Liability: The User acknowledges and accepts that they are solely responsible for the
                    use, interpretation, and reliance on the Application's output. The Application shall not be held
                    liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in
                    connection with the User's use of the Application.

                    c. Legal Compliance: The User agrees to use the Application in compliance with all applicable laws,
                    regulations, and legal obligations, including but not limited to data protection and privacy laws.

                    Limitation of Liability:
                    To the maximum extent permitted by law, the Application and its developers, including but not
                    limited to OpenAI, shall not be liable for any damages, losses, or liabilities arising out of or in
                    connection with the use of the Application, including but not limited to interpretation errors,
                    system failures, or data breaches.

                    Modification of Disclaimer:
                    The Application reserves the right to modify or amend this Disclaimer at any time without prior
                    notice. The User's continued use of the Application after any modifications to this Disclaimer
                    constitutes acceptance of the modified terms.

                    Governing Law and Jurisdiction:
                    This Disclaimer shall be governed by and construed in accordance with the laws of the European
                    Union. Any disputes arising out of or in connection with this Disclaimer shall be subject to the
                    exclusive jurisdiction of the courts within the European Union.

                    By using the Application, the User acknowledges that they have read, understood, and agreed to the
                    terms and conditions set forth in this Disclaimer. If the User does not agree with any part of this
                    Disclaimer, they should refrain from using the Application.
                </p>
            </div>
        </main>
    )
}
