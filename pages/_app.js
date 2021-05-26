import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useRouter } from "next/router"
config.autoAddCss = false
import { faBars, } from '@fortawesome/free-solid-svg-icons'
library.add(faBars)
import 'w3-css'
import "bootstrap/dist/css/bootstrap.min.css"
import Account from "./account"
import { getSession, Provider } from "next-auth/client";
import { useEffect, useState } from 'react'
import 'react-day-picker/lib/style.css';
import startAnalytics from '../utils/analytics'
import useSWR from "swr"
import { SplashScreen, LightSplashScreen } from '../comps/general/comp_splash_screen'
import { verifyAccount, getBankCodes } from '../utils/bank_transactions'
import { session } from '../utils/models/session'
import { createContext } from 'react'
import _ from 'lodash'
import { startSocket } from '../utils/chat_client'

export function reportWebVitals(metric) {
  //console.log(metric)
  startAnalytics(metric)
}


export const UserSessionContext = createContext({
  session: _.cloneDeep(session),
});

function MyApp({ Component, pageProps }) {
  let router = useRouter();
  let { session, error, loading } = sessionFetcher()
  let pathNeedAuth = authList().some(pathInArray => {
    let pathRegex = new RegExp(`${pathInArray}`, "i");
    let foundArray = router.pathname.match(pathRegex) || []
    return foundArray.length > 0;
  });
  //if loading
  if (loading) {
    return <>{router.pathname === "/" ? <SplashScreen /> : <LightSplashScreen />}</>
  }
  //if error getting user session
  if (error) {
    return <>
      <p>Error loading page...</p>
    </>
  }
  //if is user is not logged in but authh data is needed
  if (pathNeedAuth && !(session && session.user)) {
    return <>
      <Account callbackUrl={router.asPath} />
    </>
  }

  if (!(session && session.user)) {
    return <>
      <Component {...pageProps} />
    </>
  }
  if (session && session.user) {
    //console.log(session)
    //alert(location.href)
    return <>
      <Provider session={session}>
        <UserSessionContext.Provider value={{ session }} >
          <Component {...pageProps} />
        </UserSessionContext.Provider>
      </Provider>
    </>
  }

}


function authList() {
  return ["/admin", "/dashboard", "/wallet", "/profile", "/chats", "postads", "payment"]
}

function sessionFetcher() {
  let { data, error, isValidating } = useSWR("/api/auth/session", fetcher)
  //console.log(isValidating || error || data)
  return { session: data, error, loading: isValidating }
}
let fetcher = (url) => fetch(url).then(res => res.json())

if (typeof window !== "undefined") {
  startSocket().then(sck => {
    sck.emit("testing", (ack) => {
      console.log("Testing Emitted...")
    });
  })
}

export default MyApp
