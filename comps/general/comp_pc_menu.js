import { faArrowCircleRight, faArrowLeft, faBars, faFunnelDollar, faHome, faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AppBar, Box, Container, Grid, IconButton, Link, makeStyles, Typography } from "@material-ui/core"
import { AccountCircle, AlarmOn, Dashboard } from "@material-ui/icons";
import Image from "next/image";
import { useEffect, useState } from "react"

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        top: 'auto',
        bottom: 0,
        height: 60
    },

    btnStacked: {
        display: 'flex',
        justifyContent: "center",
        flexDirection: "column",
        borderWidth: 0,
        backgroundColor: "transparent",
        color: "#60942e",
        width: 50,
        alignItems: "center"
    },
}));

let PCMenu = () => {
    let classes = useStyles();
    return <>
        <AppBar position="absolute" className={classes.appBar} style={{ top: 0 }} >
            <Grid container >

                <Grid item container md={4}>
                    <Grid item container md={6} justify="space-around" alignItems="center"  >
                        <Image src="/myspace_32x32.svg" height={50} width={50} />
                        <Typography style={{ color: "black", fontSize: "1.5em" }} >
                            MySpace4You
                            </Typography>
                    </Grid>
                </Grid>

                <Grid item container md={8} justify="space-around" >

                    <Grid item container md={2} justify="space-around" alignItems="center"  >
                        <Link href="/acccount" >
                            <IconButton>
                                <AccountCircle style={{ color: "black", fontSize: "1.5em" }} />
                            </IconButton>
                        </Link>
                    </Grid>

                    <Grid item md={5} container justify="space-evenly" alignItems="center" >
                        <Box component="button" className={classes.btnStacked} >
                            <span><FontAwesomeIcon icon={faHome} /></span>
                            <span style={{ fontSize: "12px" }}>Home</span>
                        </Box>
                        <Link href="/dashboard">
                            <Box component="button" className={classes.btnStacked} >
                                <span><Dashboard /></span>
                                <span style={{ fontSize: "12px" }}>Dashboard</span>
                            </Box>
                        </Link>

                        <Link href="/postads">
                            <Box component="button" className={classes.btnStacked}>
                                <span>
                                    <FontAwesomeIcon icon={faPlusCircle} className="fa-3x" />
                                </span>
                            </Box>
                        </Link>
                        <Box component="button" className={classes.btnStacked}>
                            <span><FontAwesomeIcon icon={faFunnelDollar} /></span>
                            <span style={{ fontSize: "12px" }}>Realty</span>
                        </Box>
                        <Box component="button" className={classes.btnStacked}>
                            <span><AlarmOn /></span>
                            <span style={{ fontSize: "12px" }} >Notification</span>
                        </Box>
                    </Grid>

                    <Grid item container md={2} justify="space-around" alignItems="center"  >
                        <Link href="/acccount" >
                            <AccountCircle style={{ color: "black", fontSize: "2.5em" }} />
                        </Link>
                    </Grid>

                </Grid>

            </Grid>
        </AppBar>
    </>
}




export { PCMenu }