import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useRouter } from "next/router"
config.autoAddCss = false
import { faBars,  } from '@fortawesome/free-solid-svg-icons'
library.add(faBars)
import 'w3-css'
import "bootstrap/dist/css/bootstrap.min.css"
import Account from "./account"
import {  getSession, Provider } from "next-auth/client";
import { useEffect, useState } from 'react'
import 'react-day-picker/lib/style.css';
import startAnalytics from '../utils/analytics'

export function reportWebVitals(metric) {
  console.log(metric)
  startAnalytics(metric)
}

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
  //console.log(session);
  return <>
    <Provider session={pageProps.session}>
      { /* */pathNeedAuth && !sessionState ?
        <Account callbackUrl={router.asPath} /> : <Component {...pageProps} />
      }
    </Provider></>
}

function authList() {
  return ["/admin", "/dashboard", "/wallet", "/profile", "/chats"]
}

async function mySessionFn(hookChangeSessionState) {
  const session = await getSession()
  console.log(session)
  hookChangeSessionState(session)
  /* ... */
}

export default MyApp
