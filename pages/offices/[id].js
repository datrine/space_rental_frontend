import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { SpaceDescription } from '../../comps/special/space/index_desc';
import useSWR, { SWRConfig } from 'swr'
import { session } from '../../utils/models/session';
import React, { createContext } from 'react';
import _ from 'lodash';
import { space } from '../../utils/models/space';

export let spaceDataDefault = {
    nameOfSpace: "",
    descOfSpace: "",
    typeOfSpace: "",
    spaceInfo: {
        houseType: "", spaceCategory: "", spaceCondition: "",
        bedroomNumber: 1, bathroomNumber: 1, kitchenNumber: 0, sittingNumber: 0
    },
    flatmateInfo: [],
    spaceRules: [{ desc: "Pets allowed" }, { desc: "Smoking allowed" }, { desc: "Couple allowed" }],
    locationInfo: {},
    space_pics: [],
    spaceAvailabiltyInfo: { lengthOfStay: 1, datesInfo: {} },
    spaceBills: { charge: 0, otherBills: 0, billFormat: "day" },
    spaceAmenities: [{ id: "", desc: "Shared Living Room" }], ...space
};

export const SpaceContext = createContext({
    spaceData: _.cloneDeep(space),
});

let Space = ({ csrfToken, callbackUrl, session, ...otherProps }) => {
    let router = useRouter();
    let { query: { id } } = router;
    let { spaceDataFromServer, error, loading } = spaceFetcher(id);
    if (error) {
        return <>
            <p>Error loading data...</p>
        </>
    }
    if (loading) {
        return <>
            <><p>Loading...</p></>
        </>
    }
    return <>
    <SpaceDescription spaceDataProps={spaceDataFromServer} />
    </>
}

function spaceFetcher(spaceId) {
    let { data, error, isValidating } = useSWR(`/api/offices/${spaceId}`, fetcher,{
        revalidateOnFocus:false
    });
    return { spaceDataFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export default Space;