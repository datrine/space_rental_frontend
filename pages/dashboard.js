import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { Comp_Dashboard } from '../comps/special/comp_dashboard';

let Dashboard = ({ csrfToken, callbackUrl, ...otherProps }) => {
    //console.log("here in login")
    return <>
        <Comp_Dashboard csrfToken={csrfToken} callbackUrl={callbackUrl} />
    </>
}
let getStaticProps = async (context) => {
    return {
        props: { csrfToken: await csrfToken(context)}
    }
}
export default Dashboard;
export {getStaticProps}