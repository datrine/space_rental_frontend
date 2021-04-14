import Image from "next/image"
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Dialog, DialogTitle, Grid, IconButton, Input, InputAdornment, Typography } from "@material-ui/core"
import { Announcement, ArrowBack, Chat, Edit, Help, Label, Person, Power, PowerOff, PowerOffRounded, Settings, } from "@material-ui/icons"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFile, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function OpenedMenu() {
    return <>
        <Container style={{
            padding: 0, position: "fixed", top: 50, bottom: 0, right: 0,
            zIndex: 499, backgroundColor: "white"
        }}>
            <p style={{ textAlign: "center" }}><Image src={"/logo.png"} width={40} height={40} /></p>
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
                                <Button>Overview</Button>
                                <Button>Profile</Button>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Container>

                <Container>
                    <Accordion square={true} style={{ marginTop: 20 }} >
                        <AccordionSummary style={{}}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Grid container>
                                <Grid item container xs={2}>
                                    <Image src="/dashboard/local_feeds.png" height={30} width={30} />
                                </Grid>
                                <Grid item container xs={10}><h4>Post Ads</h4></Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails style={{ padding: 0, borderStyle: "none", borderRightStyle: "none" }}>
                            <Grid container direction="column" alignItems="stretch">
                                <Button>Overview</Button>
                                <Button>Profile</Button>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Container>

                <Container style={{ padding: 20, paddingTop: 5 }}>
                    <Grid container>
                        <Grid item container xs={2}>
                            <Chat />
                        </Grid>
                        <Grid item container xs={10}><h4>My Chats</h4></Grid>
                    </Grid>
                </Container>




                <Container style={{ padding: 20, }}>
                    <Grid container>
                        <Grid item container xs={2}>
                            <Announcement />
                        </Grid>
                        <Grid item container xs={10}><h4>Referrals</h4></Grid>
                    </Grid>
                </Container>

                <Container style={{ padding: 20,}}>
                    <Grid container>
                        <Grid item container xs={2}>
                            <Settings />
                        </Grid>
                        <Grid item container xs={10}><h4>Settings</h4></Grid>
                    </Grid>
                </Container>

                <Container style={{ padding: 20,}}>
                    <Grid container>
                        <Grid item container xs={2}>
                            <Help />
                        </Grid>
                        <Grid item container xs={10}><h4>Get help</h4></Grid>
                    </Grid>
                </Container>

                <Container style={{ padding: 20,}}>
                    <Grid container>
                        <Grid item container xs={2}>
                            <PowerOffRounded />
                        </Grid>
                        <Grid item container xs={10}><h4>Log out</h4></Grid>
                    </Grid>
                </Container>
            </>
        </Container>
    </>
}

export { OpenedMenu }