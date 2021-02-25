import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useRouter } from "next/router"
config.autoAddCss = false
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
library.add(faBars)
import 'w3-css'
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./login"
import { signIn, signOut, useSession, getSession, Provider } from "next-auth/client";
import { useEffect, useState } from 'react'
import { socket } from "../utils/chat_client"

function MyApp({ Component, pageProps }) {
  let router = useRouter();
  //console.log(socket)
  let [sessionState, changeSessionState] = useState(null)
  useEffect(() => {
    mySessionFn(changeSessionState)
  }, [])
  let pathNeedAuth = authList().some(pathInArray => {
    let pathRegex = new RegExp(`${pathInArray}`, "i")
    let foundArray = router.pathname.match(pathRegex) || []
    return foundArray.length > 0;
  })
  console.log(`Found match of ${router.pathname} :${pathNeedAuth}`);
  //console.log(session);
  return <>{ /* */pathNeedAuth && !sessionState ?
    <Login callbackUrl={router.route} /> :
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>}</>
}

function authList() {
  return ["/admin", "/dashboard", "/wallet", "/profile"]
}

async function mySessionFn(hookChangeSessionState) {
  const session = await getSession()
  //console.log(session)
  hookChangeSessionState(session)
  /* ... */
}

export default MyApp
