import Link from 'next/link';
import { Comp_Account } from '../comps/general/comp_acc';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';

let Account = ({ csrfToken, callbackUrl, ...otherProps }) => {
    //console.log("here in login")
    //console.log(callbackUrl)
    return <>
        <Comp_Account csrfToken={csrfToken} callbackUrl={callbackUrl} />
    </>
}
let getStaticProps = async (context) => {
    return {
        csrfToken: await csrfToken(context)
    }
}
export default Account;
export {getStaticProps}