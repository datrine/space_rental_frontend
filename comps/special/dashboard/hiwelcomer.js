import Link from 'next/link';
import Image from "next/image"
import { useContext, useState, } from "react"
import { useSession } from "next-auth/client";
import { Container, Dialog, DialogTitle, Grid, } from "@material-ui/core"
import { Announcement, ArrowBack, } from "@material-ui/icons"
import View from '../../view';
import { Loading, LogoSVG, SessionState } from '../../resuables/reusables';
import { uploader, stateMgr, getImgUrl, appColor } from '../../../utils/utilFns';
import { ProfileContext } from '../../../pages/dashboard';
import { UserSessionContext } from '../../../pages/_app';

let states = stateMgr()

export default function HiWelcomer({ }) {
    let { profile } = useContext(ProfileContext);
    let { session } = useContext(UserSessionContext);
    let [loadingState, changeLoadingState] = useState(states.None)
    let [showFull, toggleShowFull] = useState(false)
    let { prof_pic} = profile
    let imgUrl  = getImgUrl(prof_pic) || "/user_profile.png"
    /**
     * @type {File} profImgState
     */
    //changeLoadingState(states.Loaded)
    return <>
        <Container style={{ marginTop: "70px" }}>
            <Grid container>
                <Grid direction="column" item container xs={6} >
                    <h3>Hi {session.user.username}</h3>
                    <h5 style={{color:appColor}} >Overview</h5>
                </Grid>
                <Grid justify="flex-end" item container xs={6}>
                    <img onClick={
                        e => {
                            toggleShowFull(true)
                        }
                    } src={imgUrl} width={70} height={70} style={{ borderRadius: "50%" }} />
                </Grid>
            </Grid>
        </Container>
        <Dialog open={showFull} onClose={
            () => {
                toggleShowFull(false)
            }
        } >
            <DialogTitle>Profile Picture</DialogTitle>
            <Container>
                <Grid justify="center" container style={{ paddingBottom: "10px" }} >
                    <img src={imgUrl} width={250} height={250} style={{ borderRadius: "50%" }} />
                </Grid>
            </Container>
        </Dialog>
    </>

}