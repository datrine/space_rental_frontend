import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { PropIndex } from '../../comps/special/properties/prop_index';

let PostAds = ({ csrfToken, callbackUrl, ...otherProps }) => {
    //console.log("here in login")
    return <>
        <PropIndex csrfToken={csrfToken} callbackUrl={callbackUrl} />
    </>
}
PostAds.getInitialProps = async (context) => {
    return {
        csrfToken: await csrfToken(context)
    }
}
export default PostAds;