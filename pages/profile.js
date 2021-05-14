import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { Comp_Profile } from '../comps/special/profile/index';
import { ProfileContext, UserSessionContext } from '../utils/contexts';
import { useState } from 'react';
import useSWR from "swr"
import { session, profile } from "../utils/models/exportModels"
/**
 * 
 * @param {object} params
 * @param {session} params.session
 * @returns 
 */
let Profile = ({ session, csrfToken, callbackUrl, ...otherProps }) => {
    let [profileState, changeProfileContextState] = useState({ ...session.user });
    let { data, loading, error } = profileFetcher(session.user.profileId)
    let profView = null
    if (error) {
        profView = <><p>Error loading view...</p></>
    }
    else if (data) {
        /**
         * @type {profileState}
         */
        let profile = data.profile
        profView = <ProfileContext.Provider
            value={{ profile, changeContext: changeProfileContextState }} >
            <Comp_Profile csrfToken={csrfToken} callbackUrl={callbackUrl} />
        </ProfileContext.Provider>
    }
    else if (!data) {
        profView = <><p>No user found...</p></>
    }
    return <>
        <UserSessionContext.Provider value={{ session }} >
            {profView}

        </UserSessionContext.Provider>
    </>
}

function profileFetcher(id) {
    let { data, error, isValidating } = useSWR(`/api/profiles/${id}`, fetcher)
    console.log(data || error || isValidating)
    return { data, error, loading: isValidating }
}
let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});


export { ProfileContext, UserSessionContext }
export default Profile;
