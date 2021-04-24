import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { RoomProps } from '../../comps/special/properties/room_prop';

let Room = ({ csrfToken, callbackUrl, ...otherProps }) => {
    //console.log("here in login")
    return <>
        <RoomProps csrfToken={csrfToken} callbackUrl={callbackUrl} />
    </>
}

export default Room;