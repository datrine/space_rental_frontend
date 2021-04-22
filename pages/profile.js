import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { Comp_Profile } from '../comps/special/profile/index';

let Profile = ({ csrfToken, callbackUrl, ...otherProps }) => {
    //console.log("here in login")
    return <>
        <Comp_Profile csrfToken={csrfToken} callbackUrl={callbackUrl} />
    </>
}
Profile.getInitialProps = async (context) => {
    return {
        csrfToken: await csrfToken(context)
    }
}
export default Profile;