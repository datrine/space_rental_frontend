import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR, { SWRConfig } from 'swr'
import React, { createContext } from 'react';
import _ from 'lodash';
import { Spaces } from '../../comps/special/spaces';
import { tenant, profile } from '../../utils/models/exportModels';
import Tenant from '../../comps/special/view_profile/tenant';
tenant
profile
export let tenantDataDefault = {
        ...profile, ...tenant
};

export const TenantContext = createContext({
    tenantData: _.cloneDeep(tenantDataDefault),
});

let Tenants = ({ csrfToken, callbackUrl, session, ...otherProps }) => {
    let { query: { id } } = useRouter();
    let { tenantsFromServer, error, loading } = tenantsFetcher(id);
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
        {
            tenantsFromServer.map((tenantData,index) => <TenantContext.Provider
                value={{ tenantData }} key={index}  >
                <Tenant />
            </TenantContext.Provider>)
        }
    </>
}

function tenantsFetcher() {
    let { data, error, isValidating } = useSWR(`/api/tenants?`, fetcher)
    console.log(data || error || isValidating)
    return { tenantsFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export default Tenants;