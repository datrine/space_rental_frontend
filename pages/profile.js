import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { Comp_Profile } from '../comps/special/profile/index';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from "swr"
import { profile } from "../utils/models/exportModels"
import _ from 'lodash';
import { UserSessionContext } from './_app';


/**
 * 
 * @param {object} params
 * @param {session} params.session
 * @returns 
 */

let ProfileContext = createContext({ profile: _.cloneDeep(profile), changeContext: () => { } });

let Profile = ({ csrfToken, callbackUrl, ...otherProps }) => {
    let { session } = useContext(UserSessionContext);
    let { data, loading, error } = profileFetcher(session.user.profileId);
    if (error) {
        return <><p>Error loading view...</p></>
    }
    if (!data) {
        return <><p>No user found...</p></>
    }
    return <>
        <ProfileContext.Provider value={{
            profile: data,
            changeContext: () => { }
        }}>
            <PlaceHolder csrfToken={csrfToken} callbackUrl={callbackUrl} />
        </ProfileContext.Provider>
    </>

}

function PlaceHolder({ csrfToken, callbackUrl, ...otherProps }) {
    let { profile } = useContext(ProfileContext)
    let [profileState, changeProfileState] = useState(profile);
    return <>
        <ProfileContext.Provider value={{
            profile: profileState,
            changeContext: changeProfileState
        }}>
            <Comp_Profile csrfToken={csrfToken} callbackUrl={callbackUrl} />
        </ProfileContext.Provider>
    </>
}

function profileFetcher(id) {
    let { data, error, isValidating } = useSWR(`/api/profiles/${id}`, fetcher)
    //console.log(data || error || isValidating)
    return { data, error, loading: isValidating }
}
let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export { ProfileContext }
export default Profile;
