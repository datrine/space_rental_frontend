import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';

let Comp_Dashboard = ({ csrfToken, hookChangeRegState, callbackUrl }) => {
    let [emailOrUsernameState, changeEmailOrUsernameState] = useState("")
    let [passwordState, changePassWordState] = useState("")
    let [session, loading] = useSession()
    useEffect(() => {
    }, [])
    let view = null
    if (session) {
        let view = <> 
        <div className="">
            Dashboard for {session.user.username} </div></>
    }
    view = <>
        <div className="">
            Fetching Dashboard data </div>
    </>

    return <>
        <div className="container">
            <div className="row">
                <div className="col-2 col-xl-4 col-sm-2 col-lg-4 col-md-6">

                </div>
                <div className="col-8 col-xl-4 col-sm-8 col-lg-6 col-md-6">
                    <div className="">
                        <div className="">
                            <span> </span>
                            <h4 >Welcome <span>Back!</span></h4>
                        </div>
                        {view}
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6">

                </div>
            </div>
        </div>

    </>
}

export { Comp_Dashboard }