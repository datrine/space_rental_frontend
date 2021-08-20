import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container, Grid, IconButton } from "@material-ui/core"
import { useState } from "react"
import { LogoSVG } from "../../resuables/reusables"
import { OpenedMenu } from "./opened_menu"

function ProfileMenu() {
    let [isCollapsed, toggleCollapsed] = useState(true)
    return <>
        <Container style={{
            position: "fixed", top: 0, padding: 0, zIndex: 1000,
            backgroundColor: "white"
        }}>
            <Grid container style={{ padding: 0, }}>
                <Grid xs={isCollapsed ? 2 : 12} item container >
                    <IconButton onClick={
                        e => {
                            toggleCollapsed(!isCollapsed)
                        }
                    }><FontAwesomeIcon style={{ color: isCollapsed ? "#60941a" : "red" }}
                        icon={isCollapsed ? faBars : faTimes} /></IconButton>
                </Grid>
                {isCollapsed ? <Grid xs={10} justify="flex-end" alignItems="center" item container >
                    <IconButton>
                        <img src="/myspace_32x32.svg" height={30} width={45} />
                    </IconButton>
                    <span style={{ paddingRight: 10, fontWeight: "bolder", color: "#60941a" }} >MySpace4You</span>
                </Grid> : null}
            </Grid>
            {isCollapsed ? null : <OpenedMenu />}
        </Container>
    </>
}

export { ProfileMenu,OpenedMenu }