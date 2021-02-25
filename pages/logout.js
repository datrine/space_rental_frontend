import Link from 'next/link';
//import { Comp_Login } from '../comps/general/comp_login';
import { csrfToken, useSession,signOut } from 'next-auth/client'

let Login = ({ csrfToken, callbackUrl }) => {
    //console.log("here in login")
    //console.log(session)
    
    return <>
       {/* <Comp_Login csrfToken={csrfToken} callbackUrl={callbackUrl/>*/}
       <div>
           <p style={{textAlign:"center"}}><button onClick={signOut}>Logged out</button></p>
       </div>
    </>
}
Login.getInitialProps = async (context) => {
    return {
        csrfToken: await csrfToken(context)
    }
}
export default Login;