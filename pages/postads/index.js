import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { PostAdsIndex } from '../../comps/special/properties/postAdsIndex';

let PostAds = ({ csrfToken, callbackUrl, ...otherProps }) => {
    //console.log("here in login")
    return <>
        <PostAdsIndex csrfToken={csrfToken} callbackUrl={callbackUrl} />
    </>
}

export default PostAds;