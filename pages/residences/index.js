import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { SpaceDescription } from '../../../comps/special/space/index_desc';
import  { SWRConfig } from 'swr'
import { session } from '../../../utils/models/session';
import React from 'react';
import _ from 'lodash';


let Residences = ({ csrfToken, callbackUrl,session, ...otherProps }) => {
    //console.log("here in login")
    return <>
        <SWRConfig value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}  >
            <SpaceDescription />
        </SWRConfig>
    </>
}

export default Residences;