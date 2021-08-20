import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Dialog, DialogTitle, Grid, IconButton, Input, InputAdornment, Typography } from "@material-ui/core"
import { Announcement, ArrowBack, Chat, Edit, Help, Home, Label, Person, Power, PowerOff, PowerOffRounded, Settings, } from "@material-ui/icons"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFile, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { signOut } from "next-auth/client";

function OpenedMenu() {
    return <>
        <Container style={{
            padding: 0, position: "fixed", top: 50, bottom: 0, right: 0,
            zIndex: 499, backgroundColor: "white"
        }}>
            <Grid justify="center" container >
                <img src={"/myspace_32x32.svg"} width={40} height={40} />
            </Grid>
            <h3 style={{ textAlign: "center" }}><a href="/"
                style={{ textDecoration: "none", color: "green", fontStyle: "VAGRounded BT" }}>MySpace4You</a></h3>
            <>
                <Container>
                    <Accordion >
                        <AccordionSummary style={{ padding: 0 }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Grid container>
                                <Grid item container xs={2}>
                                    <Person />
                                </Grid>
                                <Grid item container xs={10}><h4>My Account</h4></Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column" alignItems="stretch">
                                <Button><a href="/dashboard" >Overview</a></Button>
                                <Button><a href="/profile" >Profile</a></Button>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Container>

                <Container style={{ display: "none" }} >
                    <Accordion square={true} style={{ marginTop: 10 }} >
                        <AccordionSummary style={{ padding: 0 }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Grid container>
                                <Grid item container xs={2}>
                                    <img src="/dashboard/postads.svg" height={30} width={30} />
                                </Grid>
                                <Grid item container xs={10}><h4>Post Ads</h4></Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails style={{ borderStyle: "none", borderRightStyle: "none" }}>
                            <Grid container direction="column" alignItems="stretch">
                                <Grid container>
                                    <Grid item container xs={2}>
                                        <img src="/dashboard/localfeeds.svg" height={30} width={30} />
                                    </Grid>
                                    <br />
                                    <Grid item container xs={10}>
                                        <h5 ><a href="/postads">Local Feeds</a></h5></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item container xs={2}>
                                        <img src="/dashboard/savedads.svg" height={30} width={30} />
                                    </Grid>
                                    <Grid item container xs={10}><h5>Saved Ads</h5></Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Container>

                <Container style={{ padding: 20, paddingTop: 10, paddingBottom: 5 }}>
                    <Grid container style={{ paddingTop: 0, marginTop: 0 }}>
                        <Grid item container xs={2} style={{ paddingTop: 0, marginTop: 0 }}>
                            <Settings />
                        </Grid>
                        <Grid item container xs={10}><h4><a href="/postads" >Post Ads</a></h4></Grid>
                    </Grid>
                </Container>

                <Container style={{ padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                    <Grid container>
                        <Grid item container xs={2}>
                            <Chat />
                        </Grid>
                        <Grid item container xs={10}><h4>My Chats</h4></Grid>
                    </Grid>
                </Container>

                <Container style={{ padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                    <Grid container style={{ paddingTop: 0, marginTop: 0 }}>
                        <Grid item container xs={2} style={{ paddingTop: 0, marginTop: 0 }}>
                            <Announcement />
                        </Grid>
                        <Grid item container xs={10}><h4>Referrals</h4></Grid>
                    </Grid>
                </Container>

                <Container style={{ padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                    <Grid container style={{ paddingTop: 0, marginTop: 0 }}>
                        <Grid item container xs={2} style={{ paddingTop: 0, marginTop: 0 }}>
                            <Settings />
                        </Grid>
                        <Grid item container xs={10}><h4>Settings</h4></Grid>
                    </Grid>
                </Container>

                <Container style={{ padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                    <Grid container style={{ paddingTop: 0, marginTop: 0 }}>
                        <Grid item container xs={2} style={{ paddingTop: 0, marginTop: 0 }}>
                            <Home />
                        </Grid>
                        <Grid item container xs={10}><h4><a href="/" >Home</a></h4></Grid>
                    </Grid>
                </Container>

                <Container style={{ padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                    <Grid container style={{ paddingTop: 0, marginTop: 0 }}>
                        <Grid item container xs={2} style={{ paddingTop: 0, marginTop: 0 }}>
                            <Help />
                        </Grid>
                        <Grid item container xs={10}><h4>Get help</h4></Grid>
                    </Grid>
                </Container>

                <Container style={{ padding: 20, paddingTop: 5, paddingBottom: 5 }}>
                    <Grid container style={{ paddingTop: 0, marginTop: 0 }}>
                        <Grid item container xs={2} style={{ paddingTop: 0, marginTop: 0 }}>
                            <PowerOffRounded />
                        </Grid>
                        <Grid item container xs={10}>
                            <h4 onClick={() => signOut()}>Log out</h4></Grid>
                    </Grid>
                </Container>
            </>
        </Container>
    </>
}

function PurseTemplatee({title="",iconLeft}) {
    return <>
        <Container style={{ marginTop: "30px",width:"66%" }}>
            <Grid container direction="row" 
             justify="space-between" alignItems="center" container
                style={{ padding: 5, borderWidth: 1, borderStyle: "solid" }} >
                <h3 >{title}</h3>
                <IconButton>
                    <a href="/profile" >
                        <img src={"/dashboard/bx_bx-edit.png"} width={30} height={30} />
                    </a>
                </IconButton>
            </Grid>
            <Grid direction="column" container
                style={{
                    padding: 10, borderWidth: 1, borderStyle: "solid",
                    borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"
                }} >
                <h4>{f_name || l_name ? (f_name + " " + l_name) : <span style={{ fontStyle: "italic" }}>
                    Full name: Edit your profile</span>}
                </h4>
                <h5>{email}</h5>
                <h5>{gender}</h5>
                <h5 style={{ fontStyle: "italic" }}>{occupation || <span >
                    Occupation: edit your profile</span>}</h5>
            </Grid>
        </Container>
    </>
}

export { OpenedMenu }