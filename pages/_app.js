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
import { SplashScreen ,LightSplashScreen} from '../comps/general/comp_splash_screen'
import { escapeSelector } from 'jquery'
import { verifyAccount } from '../utils/bank_transactions'

export function reportWebVitals(metric) {
  //console.log(metric)
  startAnalytics(metric)
}


function MyApp({ Component, pageProps }) {
  let router = useRouter();
  let { session, error, loading } = sessionFetcher()
  let pathNeedAuth = authList().some(pathInArray => {
    let pathRegex = new RegExp(`${pathInArray}`, "i")
    let foundArray = router.pathname.match(pathRegex) || []
    return foundArray.length > 0;
  });

  if (loading) {
    return <>{router.pathname==="/"?<SplashScreen/>:<LightSplashScreen />}</>
  }

  if (pathNeedAuth && (error || !session?.user)) {
    return <>
      <Account callbackUrl={router.asPath} />
    </>
  }

  if (!(session?.user)) {
    return <>
      <Account callbackUrl={router.asPath} />
    </>
  }
  console.log(session)

  return <>
    <Provider session={session}>
      <Component session={session} {...pageProps} />
    </Provider>
  </>

}


function authList() {
  return ["/admin", "/dashboard", "/wallet", "/profile", "/chats", "postads"]
}

function sessionFetcher() {
  let { data, error, isValidating } = useSWR("/api/auth/session", fetcher)
  return { session: data, error, loading: isValidating }
}
let fetcher = (url) => fetch(url).then(res => res.json())

verifyAccount({account_bank:"UBA",account_number:"2043356432"})

export default MyApp
