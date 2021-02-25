import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons';

let Comp_CustomerChatApp = ({ csrfToken, hookChangeRegState, callbackUrl }) => {
    let [emailOrUsernameState, changeEmailOrUsernameState] = useState("")
    let [passwordState, changePassWordState] = useState("")
    let [session, loading] = useSession()
    let [showChatGrid, changeShowChatGridState] = useState(false)
    useEffect(() => {
    }, [])
    let view = null
    return <>
        <StartChatBtn showChatGrid={showChatGrid}
            hookChangeShowChatGridState={changeShowChatGridState} />
        {showChatGrid ? <ChatGrid /> : null}
    </>
}

let StartChatBtn = ({ showChatGrid, hookChangeShowChatGridState }) => {
    return <> <button onClick={
        e => {
            hookChangeShowChatGridState(!showChatGrid)
        }
    } className="w3-btn w3-circle w3-cyan w3-text-white"
        style={{
            width: "50px", height: "50px", position: "absolute",
            bottom: "50px", right: "10px"
        }}>
        <FontAwesomeIcon icon={showChatGrid ? faTimes :faComment } /></button></>
}

let ChatGrid = ({ emailProp = "", nameProp = "" }) => {
    let [emailState, changeEmailState] = useState(emailProp)
    let [nameState, changeNameState] = useState(nameProp)
    return <>
        <div className="col-sm-4" style={{position:"absolute"}}>
            <input className="form-control" value={nameState} onClick={
                e => {
                    changeNameState(e.currentTarget.value)
                }
            } />

            <input className="form-control" value={emailState} onClick={
                e => {
                    changeEmailState(e.currentTarget.value)
                }
            } />
            <textarea className="form-control" placeholder="How can we help you?">

            </textarea>
        </div>
    </>
}

export { Comp_CustomerChatApp }