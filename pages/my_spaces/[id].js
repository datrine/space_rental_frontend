import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { SpacePropsEdit } from '../../comps/special/space/index_edit';
import { SpaceContext } from '../../comps/resuables/contextInterfaces';
import { useContext, useEffect, useState } from 'react';
import useSWR from "swr"
import { space } from '../../utils/models/space';

let Space = ({ csrfToken, callbackUrl, ...otherProps }) => {
    let { query: { id } } = useRouter();
    let { spaceDataFromServer, error, loading } = spaceFetcher(id);
    if (error) {
        return <>
            <p>Error loading data...</p>
        </>
    }
    if (loading) {
        return <>
            <p>Loading..</p>
        </>
    }
    return <>
        <SpaceContext.Provider value={{ spaceData: spaceDataFromServer }}>
            <SpaceState />
        </SpaceContext.Provider>
    </>
}

let SpaceState = () => {
    let { spaceData, changeContext } = useContext(SpaceContext)
    let [spaceDataState, changeSpaceDataState] = useState({ ...spaceData });
    let { query: { id } } = useRouter();
    let [counter, updateCounter] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            updateCounter(++counter)
        }, 5000);

    });
    console.log(counter);
    return <>
        <SpaceContext.Provider value={{
            spaceData: spaceDataState,
            changeContext: changeSpaceDataState
        }}>
            <SpacePropsEdit />
        </SpaceContext.Provider>
    </>
}

function spaceFetcher(spaceId) {
    let { data, error, isValidating } = useSWR(`/api/spaces/${spaceId}`, fetcher, {
        revalidateOnFocus: false,
        //revalidateOnMount: false,
        //revalidateOnReconnect: false,
    });
    if (data) {
        let { spaceAvailabiltyInfo ,spaceAmenities,spaceInfo,spaceRules,spaceBills} = data
        if (!spaceAvailabiltyInfo) {
            data.spaceAvailabiltyInfo = space.spaceAvailabiltyInfo
        }
        if (!spaceAmenities) {
            data.spaceAmenities = space.spaceAmenities
        }
        if (!spaceInfo) {
            data.spaceInfo = space.spaceInfo
        }
        if (!spaceRules) {
            data.spaceRules = space.spaceRules
        }
        if (!spaceBills) {
            data.spaceBills = space.spaceBills
        }
    }
    return { spaceDataFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});
export default Space;