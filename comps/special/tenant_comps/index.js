import { Container, Grid, Button, Paper, Typography } from "@material-ui/core";
import Image from "next/image";
import { createContext, useContext } from "react";
import { ProfileContext } from "../../../pages/dashboard";
import { tenant, profile } from "../../../utils/models/exportModels";
let TenantContext = createContext({
    tenant: tenant
})

function TenantView() {
    let { tenant } = useContext(TenantContext);
    let { profile } = useContext(ProfileContext);
    return <>
        <Container>
            <ProfileProvider profileId={tenant.id}>
                {profile ? <TenantProper /> : null}
            </ProfileProvider>
        </Container>
    </>
}

function TenantProper() {
    let { profile } = useContext(ProfileContext);
    return <>
        <Container>
        </Container>
    </>
}
export function ProfileProvider({ children, profileId }) {
    //console.log(spaceId);
    let { profileFromServer, error, loading } = profileFetcher(profileId)
    if (loading) {
        return <>
            {children}
        </>
    }
    if (error) {
        return <>
            <p>Error...</p>
            {children}
        </>
    }
    if (!profileFromServer) {
        return <>
            {children}
        </>
    }
    return <>
        <ProfileContext.Provider value={{ profile: profileFromServer }} >
            {children}
        </ProfileContext.Provider>
    </>
}

function profileFetcher(profileId) {
    let { data, error, isValidating } = useSWR(`/api/profiles/${profileId}`, fetcher)
    //console.log(data || error || isValidating)
    return { profileFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});