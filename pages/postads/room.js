import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { SpaceProps } from '../../comps/special/space';

let Room = ({ csrfToken, callbackUrl, ...otherProps }) => {
    //console.log("here in login")
    return <>
        <SpaceProps csrfToken={csrfToken} callbackUrl={callbackUrl} />
    </>
}

export default Room;