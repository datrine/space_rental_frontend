import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR, { SWRConfig } from 'swr'
import React, { createContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { space } from '../../utils/models/space';
import { Spaces } from '../../comps/special/spaces';
import qs from 'qs';
import { SearchContext } from '../../comps/searchNfilter';

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

let SpacesPage = ({ csrfToken, callbackUrl, session, ...otherProps }) => {
    let { query: { id } } = useRouter();
    let params = {
        lowerBudget: 100,
        upperBudget: 20000,
        typeOfSpace: "",
        cityOrTown: "",
    }
    let [paramsState, changeParamsState] = useState(params);
    let { spacesFromServer, error, loading } = spacesFetcher({...paramsState});
    useEffect(()=>{
        console.log(paramsState);
    },[]);
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
    if (!spacesFromServer) {
        return <>
        <p>No spaces found...</p>
        </>
    }
    return <>
    <SearchContext.Provider value={{ params: paramsState, changeParams: changeParamsState }} >
    <Spaces spacesDataProps={spacesFromServer} />
        </SearchContext.Provider>
    </>
}

function spacesFetcher(opts) {
   let queryString= qs.stringify(opts)
    let { data, error, isValidating } = useSWR(`/api/spaces?${queryString}`, fetcher,{
        revalidateOnFocus:false
    });
    return { spacesFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export default SpacesPage;