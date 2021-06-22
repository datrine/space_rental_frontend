import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR, { SWRConfig } from 'swr'
import React, { createContext } from 'react';
import _ from 'lodash';
import { space } from '../../utils/models/space';
import { Spaces } from '../../comps/special/spaces';

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

let Residences = ({ csrfToken, callbackUrl, session, ...otherProps }) => {
    let { spacesFromServer, error, loading } = spacesFetcher();
    if (error) {
        return <>
            <p>Error loading data...</p>
        </>
    }
    if (loading) {
        return <>
        <p>Loading...</p>
        </>
    }
    return <>
    <Spaces spacesDataProps={spacesFromServer} />
    </>
}

function spacesFetcher() {
    let { data, error, isValidating } = useSWR(`/api/residences?`, fetcher)
    console.log(data || error || isValidating)
    return { spacesFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export default Residences;