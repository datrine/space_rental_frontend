import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { Comp_Dashboard } from '../comps/special/dashboard';
import _ from 'lodash';
import profile from '../utils/models/profile';
import useSWR from "swr";
import { UserSessionContext } from './_app';
import { createContext, useContext } from 'react';

/**
 * 
 * @param {object} params
 * @param {session} params.session
 * @returns 
 */

let ProfileContext = createContext({ profile: _.cloneDeep(profile), changeContext: () => { } });

let Dashboard = ({ csrfToken, callbackUrl, ...otherProps }) => {
    let { session } = useContext(UserSessionContext);
    console.log("session.user.profileId: "+session.user.profileId)
    let { data, loading, error } = profileFetcher(session.user.profileId)
    if (loading) {
        return <>Loading...</>
    }
    if (error) {
        return <>Error...</>
    }
    if (!data) {
        return <>No data...</>
    }
    return <>
        <ProfileContext.Provider value={{
            profile: data
        }}>
            <Comp_Dashboard csrfToken={csrfToken} callbackUrl={callbackUrl} />
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
export default Dashboard;